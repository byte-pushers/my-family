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
    "transactionId": [GUID, required], // used for logging and tracking transaction from front-end to back-end
	"user": {
      "username": "string",
      "password": "string",
      "roles": [
        {
          "name": "string",
          "permissions": [
            {
              "name": "string"
            }
          ]
        }
      ],
      "familyMembers": [
          {
              "relationship": "string",
              "person": {
                  "firstName": [string, required, alpha],
        "middleName": [string, optional, alpha] | null | undefined,
        "lastName": [string, alpha],
        "email": [string, optional] | null,
        "phoneNumber": {
            "type": [string, alpha],
            "country code": [string, numeric]
            "area code": [string, numeric]
            "subscriber number": [string, numeric] 
        } | null | undefined,
        "address": {
            "address line1": [string, alphanumerica],
            "address line2": [string, optional, alphanumerica] | null | undefined,
            "city": [string],
            "state": [string],
            "zipcode": [string, alpha numeric hyphen]
        } | null | undefined  
                  "familyMembers": [
                      {
                          "relationship": "string",
                          "person": {
                          "firstName": [string, required, alpha],
        "middleName": [string, optional, alpha] | null | undefined,
        "lastName": [string, alpha],
        "email": [string, optional] | null,
        "phoneNumber": {
            "type": [string, alpha],
            "country code": [string, numeric]
            "area code": [string, numeric]
            "subscriber number": [string, numeric] 
        } | null | undefined,
        "address": {
            "address line1": [string, alphanumerica],
            "address line2": [string, optional, alphanumerica] | null | undefined,
            "city": [string],
            "state": [string],
            "zipcode": [string, alpha numeric hyphen]
        } | null | undefined
                          }
                      }
                  ]
              }
          }
      ]	
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

##### Request Body

```
{
    "status": "integer",              // HTTP status code
    "message": "string",              // Response message
    "data": {
        "id": "integer",              // Family tree unique identifier
        "createdBy": "string",        // User who created the family tree
        "updatedBy": "string",        // User who last updated the family tree
        "createdDate": "string",      // ISO 8601 format date of creation
        "updatedDate": "string",      // ISO 8601 format date of last update
        "parentName": "string",       // Name of the parent family
        "parentType": "string",       // Type of the parent family (e.g., "Nuclear")
        "grandParentName": "string",  // Name of the grandparent family
        "grandParentType": "string",  // Type of the grandparent family (e.g., "Extended")
        "siblingName": "string",      // Name of the sibling (optional)
        "siblingType": "string",      // Type of sibling relationship (optional)
        "spouseName": "string",       // Name of the spouse (optional)
        "spouseType": "string",       // Type of spouse relationship (optional)
        "childrenName": "string",     // Name of the children (optional)
        "childrenType": "string",     // Type of children relationship (optional)
        "cousinName": "string",       // Name of the cousins (optional)
        "uncleName": "string",        // Name of the uncles (optional)
        "auntName": "string",         // Name of the aunts (optional)
        "familyMembers": [            // Array of family members
            {
                "id": "integer",      // Unique identifier for the family member
                "relationship": "string", // Relationship of the family member (e.g., "Father")
                "person": {
                    "firstName": "string",  // First name of the person
                    "lastName": "string",   // Last name of the person
                    "birthDate": "string",  // Birthdate of the person (in YYYY-MM-DD format)
                    "gender": "string",     // Gender of the person (e.g., "Male")
                    "familyMembers": [      // Nested family members (recursive structure)
                        {
                            "relationship": "string",  // Nested family member's relationship
                            "person": {
                                "firstName": "string",  // First name of the nested person
                                "lastName": "string",   // Last name of the nested person
                                "birthDate": "string",  // Birthdate of the nested person
                                "gender": "string",     // Gender of the nested person
                                "familyMembers": []     // Further nested family members (optional)
                            }
                        }
                    ]
                }
            }
        ],
        "user": "object",              // Optional user object linked to the family tree
        "parentsList": "array",        // Array of parent family members (optional)
        "grandParentList": "array",    // Array of grandparent family members (optional)
        "siblingList": "array",        // Array of sibling family members (optional)
        "spouseList": "array",         // Array of spouse family members (optional)
        "childrenList": "array",       // Array of children family members (optional)
        "cousinsList": "array",        // Array of cousin family members (optional)
        "unclesList": "array",         // Array of uncle family members (optional)
        "auntsList": "array"           // Array of aunt family members (optional)
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