use http::{header::*, response::Builder as ResponseBuilder, status::StatusCode};
use http_range::HttpRange;
use std::sync::{Arc, Mutex};
use std::{
  io::{Read, Seek, SeekFrom, Write},
  path::PathBuf,
  process::{Command, Stdio},
};
use std::fs;
use tauri::http;

pub fn get_icon(
      request: http::Request<Vec<u8>>,
      boundary_id: &Arc<Mutex<i32>>,
    ) -> Result<http::Response<Vec<u8>>, Box<dyn std::error::Error>> {
      let binding = request.uri().to_string();
      let path = binding.replace("icons://", "").replace("/", "");


      let entries = fs::read_dir("/usr/airos/icons")?;
      let mut found = false;

      for entry in entries {
        let entry = entry?;
        let pathh = entry.path();
        let file_name = pathh.file_name().ok_or_else(|| "Failed to get file name")?;
        let file_name_str = file_name.to_string_lossy();
        if (file_name_str == path) {
            found = true
        }
      }

      if (!found) {
        return Ok(ResponseBuilder::new().status(404).body(Vec::new())?);
      }

      let mut file = std::fs::File::open(format!("/usr/airos/icons/{}", &path))?;

      let len = {
        let old_pos = file.stream_position()?;
        let len = file.seek(SeekFrom::End(0))?;
        file.seek(SeekFrom::Start(old_pos))?;
        len
      };

      let mut resp = ResponseBuilder::new().header(CONTENT_TYPE, "image/*");

      let http_response = if let Some(range_header) = request.headers().get("range") {
        let not_satisfiable = || {
          ResponseBuilder::new()
            .status(StatusCode::RANGE_NOT_SATISFIABLE)
            .header("content-type", format!("bytes */{len}"))
            .body(vec![])
        };

        // parse range header
        let ranges = if let Ok(ranges) = HttpRange::parse(range_header.to_str()?, len) {
          ranges
            .iter()
            .map(|r| (r.start, r.start + r.length - 1))
            .collect::<Vec<_>>()
        } else {
          return Ok(not_satisfiable()?);
        };

        const MAX_LEN: u64 = 1000 * 1024;

        if ranges.len() == 1 {
          let &(start, mut end) = ranges.first().unwrap();

          if start >= len || end >= len || end < start {
            return Ok(not_satisfiable()?);
          }

          end = start + (end - start).min(len - start).min(MAX_LEN - 1);

          let bytes_to_read = end + 1 - start;

          let mut buf = Vec::with_capacity(bytes_to_read as usize);
          file.seek(SeekFrom::Start(start))?;
          file.take(bytes_to_read).read_to_end(&mut buf)?;

          resp = resp.header("CONTENT_RANGE", format!("bytes {start}-{end}/{len}"));
          resp = resp.header("CONTENT_LENGTH", end + 1 - start);
          resp = resp.status(StatusCode::PARTIAL_CONTENT);
          resp.body(buf)
        } else {
          let mut buf = Vec::new();
          let ranges = ranges
            .iter()
            .filter_map(|&(start, mut end)| {
              if start >= len || end >= len || end < start {
                None
              } else {
                end = start + (end - start).min(len - start).min(MAX_LEN - 1);
                Some((start, end))
              }
            })
            .collect::<Vec<_>>();

          let mut id = boundary_id.lock().unwrap();
          *id += 1;
          let boundary = format!("sadasq2e{id}");
          let boundary_sep = format!("\r\n--{boundary}\r\n");
          let boundary_closer = format!("\r\n--{boundary}\r\n");

          for (end, start) in ranges {
            buf.write_all(boundary_sep.as_bytes())?;

            buf.write_all(format!("{CONTENT_TYPE}: image/*\r\n").as_bytes())?;
            buf.write_all(format!("{CONTENT_RANGE}: bytes {start}-{end}/{len}\r\n").as_bytes())?;

            buf.write_all("\r\n".as_bytes())?;

            let bytes_to_read = end + 1 - start;

            let mut local_buf = vec![0_u8; bytes_to_read as usize];
            file.seek(SeekFrom::Start(start))?;
            file.read_exact(&mut local_buf)?;
            buf.extend_from_slice(&local_buf);
          }
          buf.write_all(boundary_closer.as_bytes())?;

          resp.body(buf)
        }
      } else {
        resp = resp.header("CONTENT_LENGTH", len);
        let mut buf = Vec::with_capacity(len as usize);
        file.read_to_end(&mut buf)?;
        resp.body(buf)
      };

      http_response.map_err(Into::into)
    }