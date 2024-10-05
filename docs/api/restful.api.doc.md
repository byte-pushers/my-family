## Create beautiful REST API docs authored in Markdown

- Adopted from: https://stubby4j.com/docs/admin_portal.html
- Inspired by Swagger API docs style & structure: https://petstore.swagger.io/#/pet

------------------------------------------------------------------------------------------

#### Creating new/overwriting existing stubs & proxy configs

<details>
<summary><code>POST</code><code><b>/api/users</b></code><code>Register User API</code></summary>

##### Request Headers

> | name            | value                | description                                                              |
> |-----------------|----------------------|--------------------------------------------------------------------------|
> | Content-Type    | "application/json"   | accepts json                                                             |
> | Accept-Versions | "1.5.0.0"            | comma seperated list of semantic verisions, used for semantic versioning |

##### Parameters

> | name      | type | data type | description |
> |-----------|------|-----------|-------------|
> | None      | NA   | NA        | N/A         |

##### Request Body

```
{
    "transactionId": [GUID, required], // used for logging and tracking transaction from front-end to back-end
    "accountInfo": {
        "firstName": [string, required, alpha],
        "middleName": [string, optional, alpha] | null | undefined,
        "lastName": [string, alpha],
        "email": [string, optional] | null,
        "phoneNumber": [string, optional, alphanumeric] | null | undefined,
        "address": {
            "address line1": [string, alphanumerica],
            "address line2": [string, optional, alphanumerica] | null | undefined,
            "city": [string],
            "state": [string],
            "zipcode": [string, alpha numeric hyphen]
        } | null | undefined
    }
}
```
##### Response Headers

> | name            | value                | description     |
> |-----------------|----------------------|-----------------|
> | Content-Type    | "application/json"   | produces json   |

##### Responses

> | http code | http status message   | content-type       | response body         | description                                                                                               |
> |-----------|-----------------------|--------------------|-----------------------|-----------------------------------------------------------------------------------------------------------|
> | `204`     | No Content            | `application/json` | empty                 | The request has been successfully processed, but is not returning any content                             |
> | `400`     | Bad Request           | `application/json` | [JSON Error Response] | The requested page could not be found but may be available again in the future                            |
> | `405`     | Method Not Allowed    | `application/json` | [JSON Error Response] | A request was made of a page using a request method not supported by that page                            |
> | `500`     | Internal Server Error | `application/json` | [JSON Error Response] | A generic error message, given when no more specific message is suitable                                  |
> | `501`     | Not Implemented       | `application/json` | [JSON Error Response] | The server either does not recognize the request method, or it lacks the ability to fulfill the request   |

##### JSON Successful Response Body

`emtpy`

##### JSON Error Response Body

```
{
  "code": [string] | null | undefined, // server error code
  "message": [string] | null | undefined, // server error message
  "messageKey": [string] | null | undefined // server error message key to display user friendly error message on client
}
```

##### Example cURL

> ```curl
>  curl -X POST -H "Content-Type: application/json" -H "Accept-Versions: 1.0" --data "[JSON Request Body]" http://localhost:8080/users
> ```
</details>

<details>
<summary><code>POST</code><code><b>/api/session</b></code><code>User Login API</code></summary>

##### Headers

> | name            | value             | description                                                              |
> |-----------------|-------------------|--------------------------------------------------------------------------|
> | Content-Type    | "application/json" | accepts json                                                             |
> | Accept-Versions | "1.5.0.0"         | comma seperated list of semantic verisions, used for semantic versioning |

##### Parameters

> | name      | type | data type | description |
> |-----------|------|-----------|-------------|
> | None      | NA   | NA        | N/A         |

##### Request Body

```
{
    "transactionId": [GUID, required], // used for logging and tracking transaction from front-end to back-end
    "credentials": {
        "username": [string, required], // user name
        "password": [string (base64 encoded), required] // user password
    }
}
```

##### Response Headers

> | name            | value                | description     |
> |-----------------|----------------------|-----------------|
> | Content-Type    | "application/json"   | produces json   |

##### Responses

> | http code | http status message   | content-type       | response body         | description                                                                                               |
> |-----------|-----------------------|--------------------|-----------------------|-----------------------------------------------------------------------------------------------------------|
> | `204`     | No Content            | `application/json` | empty                 | The request has been successfully processed, but is not returning any content                             |
> | `400`     | Bad Request           | `application/json` | [JSON Error Response] | The requested page could not be found but may be available again in the future                            |
> | `405`     | Method Not Allowed    | `application/json` | [JSON Error Response] | A request was made of a page using a request method not supported by that page                            |
> | `500`     | Internal Server Error | `application/json` | [JSON Error Response] | A generic error message, given when no more specific message is suitable                                  |
> | `501`     | Not Implemented       | `application/json` | [JSON Error Response] | The server either does not recognize the request method, or it lacks the ability to fulfill the request   |

##### JSON Successful Response Body

`empty`

##### JSON Error Response Body

```
{
  "code": [string], // server error code
  "message": [string], // server error message
  "messageKey": [string] // server error message key to display user friendly error message on client
}
```

##### Example cURL

> ```curl
>  curl -X POST -H "Content-Type: application/json" -H "Accept-Versions: 1.0" --data "{'username': 'pouncilt', 'password': 'zZy16Amd1'}" http://localhost:8080/session
> ```

</details>
------------------------------------------------------------------------------------------