import { Schema } from "../data/useGetSchema2";

export const fakeTestData: Schema = {
    "enums": [],
    "models": [
        {
            "name": "User",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "firstName",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false,
                    "documentation": "firstname description"
                },
                {
                    "name": "lastName",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false,
                    "documentation": "lastname description"
                },
                {
                    "name": "birthdate",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "DateTime",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "login",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "password",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false,
                    "documentation": "@Pothos.omit()"
                },
                {
                    "name": "Posts",
                    "kind": "object",
                    "isList": true,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Post",
                    "relationName": "PostToUser",
                    "relationFromFields": [],
                    "relationToFields": [],
                    "isGenerated": false,
                    "isUpdatedAt": false,
                    "documentation": "relation desc "
                },
                {
                    "name": "Comments",
                    "kind": "object",
                    "isList": true,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Comment",
                    "relationName": "CommentToUser",
                    "relationFromFields": [],
                    "relationToFields": [],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "createdAt",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "DateTime",
                    "default": {
                        "name": "now",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false,
                    "documentation": "@Pothos.omit(create, update) createdAt description"
                },
                {
                    "name": "updatedAt",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "DateTime",
                    "isGenerated": false,
                    "isUpdatedAt": true,
                    "documentation": "@Pothos.omit(create, update)"
                },
                {
                    "name": "Profile",
                    "kind": "object",
                    "isList": true,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Profile",
                    "relationName": "ProfileToUser",
                    "relationFromFields": [],
                    "relationToFields": [],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "Followers",
                    "kind": "object",
                    "isList": true,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Follow",
                    "relationName": "followers",
                    "relationFromFields": [],
                    "relationToFields": [],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "Following",
                    "kind": "object",
                    "isList": true,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Follow",
                    "relationName": "following",
                    "relationFromFields": [],
                    "relationToFields": [],
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false,
            "documentation": "User of prisma"
        },
        {
            "name": "Post",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "title",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "content",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false,
                    "documentation": "createdAt description"
                },
                {
                    "name": "Author",
                    "kind": "object",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "User",
                    "relationName": "PostToUser",
                    "relationFromFields": [
                        "authorId"
                    ],
                    "relationToFields": [
                        "id"
                    ],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "Comments",
                    "kind": "object",
                    "isList": true,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Comment",
                    "relationName": "CommentToPost",
                    "relationFromFields": [],
                    "relationToFields": [],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "authorId",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": true,
                    "hasDefaultValue": false,
                    "type": "Int",
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "ExtraModal",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "title",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false,
                    "documentation": "The title of extramodal"
                },
                {
                    "name": "createdAt",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "DateTime",
                    "default": {
                        "name": "now",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false,
                    "documentation": "@Pothos.omit(create, update) createdAt description"
                },
                {
                    "name": "updatedAt",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "DateTime",
                    "isGenerated": false,
                    "isUpdatedAt": true,
                    "documentation": "@Pothos.omit(create, update)"
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "Comment",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "comment",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "Author",
                    "kind": "object",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "User",
                    "relationName": "CommentToUser",
                    "relationFromFields": [
                        "authorId"
                    ],
                    "relationToFields": [
                        "id"
                    ],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "Post",
                    "kind": "object",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Post",
                    "relationName": "CommentToPost",
                    "relationFromFields": [
                        "postId"
                    ],
                    "relationToFields": [
                        "id"
                    ],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "authorId",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": true,
                    "hasDefaultValue": false,
                    "type": "Int",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "postId",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": true,
                    "hasDefaultValue": false,
                    "type": "Int",
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "Profile",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "bio",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "User",
                    "kind": "object",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "User",
                    "relationName": "ProfileToUser",
                    "relationFromFields": [
                        "userId"
                    ],
                    "relationToFields": [
                        "id"
                    ],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "userId",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": true,
                    "isId": false,
                    "isReadOnly": true,
                    "hasDefaultValue": false,
                    "type": "Int",
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "Follow",
            "dbName": null,
            "fields": [
                {
                    "name": "fromId",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": true,
                    "hasDefaultValue": false,
                    "type": "Int",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "toId",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": true,
                    "hasDefaultValue": false,
                    "type": "Int",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "From",
                    "kind": "object",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "User",
                    "relationName": "following",
                    "relationFromFields": [
                        "fromId"
                    ],
                    "relationToFields": [
                        "id"
                    ],
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "To",
                    "kind": "object",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "User",
                    "relationName": "followers",
                    "relationFromFields": [
                        "toId"
                    ],
                    "relationToFields": [
                        "id"
                    ],
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": {
                "name": "compositeID",
                "fields": [
                    "fromId",
                    "toId"
                ]
            },
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "Unrelated",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "name",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "IdOnly",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "WithoutID",
            "dbName": null,
            "fields": [
                {
                    "name": "name",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": true,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "WithScalars",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "string",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "boolean",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Boolean",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "int",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Int",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "float",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Float",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "decimal",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Decimal",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "bigint",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "BigInt",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "datetime",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "DateTime",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "bytes",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": false,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "Bytes",
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        },
        {
            "name": "Options",
            "dbName": null,
            "fields": [
                {
                    "name": "id",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": true,
                    "isReadOnly": false,
                    "hasDefaultValue": true,
                    "type": "Int",
                    "default": {
                        "name": "autoincrement",
                        "args": []
                    },
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "key",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": true,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                },
                {
                    "name": "value",
                    "kind": "scalar",
                    "isList": false,
                    "isRequired": true,
                    "isUnique": false,
                    "isId": false,
                    "isReadOnly": false,
                    "hasDefaultValue": false,
                    "type": "String",
                    "isGenerated": false,
                    "isUpdatedAt": false
                }
            ],
            "primaryKey": null,
            "uniqueFields": [],
            "uniqueIndexes": [],
            "isGenerated": false
        }
    ],
    "customizations": {
        "User": {
            "fields": {
                "createdAt": {
                    "tableView": {
                        "read": true
                    },
                    "actions": {
                        "update": false,
                        "create": false
                    }
                }
            }
        }
    }
}