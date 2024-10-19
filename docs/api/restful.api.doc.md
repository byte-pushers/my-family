## Create beautiful REST API docs authored in Markdown

- Adopted from: https://stubby4j.com/docs/admin_portal.html
- Inspired by Swagger API docs style & structure: https://petstore.swagger.io/#/pet

------------------------------------------------------------------------------------------

#### Creating new/overwriting existing stubs & proxy configs

<details>
<summary><code>POST</code><code><b>/api/users</b></code><code>Register User API</code></summary>

##### Request Headers

> | name            | value              | description                                                             |
> |-----------------|--------------------|-------------------------------------------------------------------------|
> | Content-Type    | "application/json" | accepts json                                                            |
> | Accept          | "application/json" | accepts json                                                            |
> | Accept-Versions | "0.0.0.1"          | comma seperated list of semantic versions, used for semantic versioning |

##### Parameters

> | name      | type | data type | description |
> |-----------|------|-----------|-------------|
> | None      | NA   | NA        | N/A         |

##### Request Body

```
{
  "userId": 1,
  "familyMembers": [
    {
      "relationship": "string",
      "person": {
        "familyMembers": [
          {
            "relationship": "string",
            "person": {}
          }
        ]
      }
    }
  ],
  "createdBy": "string",
  "updatedBy": "string",
  "createdDate": "String in ISO 8601 Date Format",
  "updatedDate": "String in ISO 8601 Date Format"
}

```
##### Request Body Example
```
{
    "userId": 1,
    "familyMembers": [
        {
            "relationship": "Father",
            "person": {
                "firstName": "John",
                "lastName": "Doe",
                "birthDate": "1970-01-01",
                "gender": "Male",
                "familyMembers": [
                    {
                        "relationship": "Son",
                        "person": {
                            "firstName": "Mike",
                            "lastName": "Doe",
                            "birthDate": "2000-05-12",
                            "gender": "Male",
                            "familyMembers": [],
                            "createdBy": "adminUser",
                            "createdDate": "2024-10-16T10:00:00Z"
                        },
                        "createdBy": "adminUser",
                        "createdDate": "2024-10-16T10:00:00Z"
                    },
                    {
                        "relationship": "Daughter",
                        "person": {
                            "firstName": "Anna",
                            "lastName": "Doe",
                            "birthDate": "2005-08-20",
                            "gender": "Female",
                            "familyMembers": [
                                {
                                    "relationship": "Child",
                                    "person": {
                                        "firstName": "Emily",
                                        "lastName": "Smith",
                                        "birthDate": "2023-03-15",
                                        "gender": "Female",
                                        "familyMembers": []
                                    },
                                    "createdBy": "adminUser",
                                    "createdDate": "2024-10-16T10:00:00Z"
                                }
                            ],
                            "createdBy": "adminUser",
                            "createdDate": "2024-10-16T10:00:00Z"
                        },
                        "createdBy": "adminUser",
                        "createdDate": "2024-10-16T10:00:00Z"
                    }
                ], 
                "createdBy": "adminUser",
                "createdDate": "2024-10-16T10:00:00Z"
            }
        },
        {
          "relationship": "GrandFather",
          "person":{}
        },
        {
          "relationship": "GrandMother",
          "person":{}
        }
    ],
    "createdBy": "adminUser",
    "createdDate": "2024-10-16T10:00:00Z"
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
[
    {
      "code": [string] | null | undefined, // server error code
      "message": [string] | null | undefined, // server error message
      "messageKey": [string] | null | undefined // server error message key to display user friendly error message on client
    },
    {
      "code": [string], // server error code
      "message": [string], // server error message
      "messageKey": [string] // server error message key to display user friendly error message on client
    }
]
```

##### Example cURL

> ```curl
>  curl -X POST -H "Content-Type: application/json" -H "Accept-Versions: 1.0" --data "[JSON Request Body]" http://localhost:8080/users
> ```
</details>

<details>
<summary><code>GET</code><code><b>/api/session</b></code><code>User Login API</code></summary>

##### Headers

> | name            | value             | description                                                              |
> |-----------------|-------------------|--------------------------------------------------------------------------|
> | Content-Type    | "application/json" | accepts json                                                             |
> | Accept-Versions | "1.5.0.0"         | comma seperated list of semantic verisions, used for semantic versioning |

##### Parameters

> | name      | type | data type | description |
> |-----------|------|-----------|-------------|
> | None      | NA   | NA        | N/A         |

##### Response Body

```
[
    {
        "relationship": "string",
        "person": {
            "familyMembers": [
                {
                    "relationship": "string",
                    "person": {}
                }
            ]
        }
    }
]
```
##### Response Body

```
[
    {
        "id": 5,
        "createdBy": "defaultUser",
        "updatedBy": "defaultUser",
        "createdDate": "2024-10-26T12:39:51.8716034",
        "updatedDate": "2024-10-26T12:39:51.8716034",
        "relationship": "Father",
        "person": {
            "id": 6,
            "createdBy": "adminUser",
            "updatedBy": "adminUser",
            "createdDate": "2024-10-16T10:00:00",
            "updatedDate": "2024-10-26T12:39:51.8716034",
            "firstName": "John",
            "lastName": "Doe",
            "birthDate": "1970-01-01",
            "gender": "Male",
            "familyMembers": [
                {
                    "id": null,
                    "createdBy": "adminUser",
                    "updatedBy": null,
                    "createdDate": "2024-10-16T10:00:00",
                    "updatedDate": null,
                    "relationship": "Son",
                    "person": {
                        "id": null,
                        "createdBy": "adminUser",
                        "updatedBy": null,
                        "createdDate": "2024-10-16T10:00:00",
                        "updatedDate": null,
                        "firstName": "Mike",
                        "lastName": "Doe",
                        "birthDate": "2000-05-12",
                        "gender": "Male",
                        "familyMembers": []
                    },
                    "parent": null,
                    "familyMembers": null,
                    "familyTree": null
                },
                {
                    "id": null,
                    "createdBy": "adminUser",
                    "updatedBy": null,
                    "createdDate": "2024-10-16T10:00:00",
                    "updatedDate": null,
                    "relationship": "Daughter",
                    "person": {
                        "id": null,
                        "createdBy": "adminUser",
                        "updatedBy": null,
                        "createdDate": "2024-10-16T10:00:00",
                        "updatedDate": null,
                        "firstName": "Anna",
                        "lastName": "Doe",
                        "birthDate": "2005-08-20",
                        "gender": "Female",
                        "familyMembers": [
                            {
                                "id": null,
                                "createdBy": "adminUser",
                                "updatedBy": null,
                                "createdDate": "2024-10-16T10:00:00",
                                "updatedDate": null,
                                "relationship": "Child",
                                "person": {
                                    "id": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "createdDate": null,
                                    "updatedDate": null,
                                    "firstName": "Emily",
                                    "lastName": "Smith",
                                    "birthDate": "2023-03-15",
                                    "gender": "Female",
                                    "familyMembers": []
                                },
                                "parent": null,
                                "familyMembers": null,
                                "familyTree": null
                            }
                        ]
                    },
                    "parent": null,
                    "familyMembers": null,
                    "familyTree": null
                }
            ]
        },
        "parent": null,
        "familyMembers": null,
        "familyTree": null
    },
    {
        "id": 7,
        "createdBy": "defaultUser",
        "updatedBy": "defaultUser",
        "createdDate": "2024-10-26T12:39:51.8716034",
        "updatedDate": "2024-10-26T12:39:51.8716034",
        "relationship": "GrandFather",
        "person": {
            "id": 8,
            "createdBy": "defaultUser",
            "updatedBy": "defaultUser",
            "createdDate": "2024-10-26T12:39:51.8716034",
            "updatedDate": "2024-10-26T12:39:51.8716034",
            "firstName": null,
            "lastName": null,
            "birthDate": null,
            "gender": null,
            "familyMembers": null
        },
        "parent": null,
        "familyMembers": null,
        "familyTree": null
    },
    {
        "id": 9,
        "createdBy": "defaultUser",
        "updatedBy": "defaultUser",
        "createdDate": "2024-10-26T12:39:51.8716034",
        "updatedDate": "2024-10-26T12:39:51.8716034",
        "relationship": "GrandMother",
        "person": {
            "id": 10,
            "createdBy": "defaultUser",
            "updatedBy": "defaultUser",
            "createdDate": "2024-10-26T12:39:51.8716034",
            "updatedDate": "2024-10-26T12:39:51.8716034",
            "firstName": null,
            "lastName": null,
            "birthDate": null,
            "gender": null,
            "familyMembers": null
        },
        "parent": null,
        "familyMembers": null,
        "familyTree": null
    }
]
```
#### Response Example
'''

'''
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
[
    {
      "code": [string], // server error code
      "message": [string], // server error message
      "messageKey": [string] // server error message key to display user friendly error message on client
    },
    {
      "code": [string], // server error code
      "message": [string], // server error message
      "messageKey": [string] // server error message key to display user friendly error message on client
    }
]
```

##### Example cURL

> ```curl
>  curl -X GET -H "Content-Type: application/json" -H "Accept-Versions: 1.0" --data "{'username': 'pouncilt', 'password': 'zZy16Amd1'}" http://localhost:8080/session
> ```

</details>
------------------------------------------------------------------------------------------