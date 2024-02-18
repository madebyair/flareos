import { atom } from "@zedux/react";

export const userState = atom('user', {
    "firstName": "",
    "lastName": "",
    "email": "",
    "uuid": "",
    "sessionUuid": "",
    "sessionSecret": ""
});