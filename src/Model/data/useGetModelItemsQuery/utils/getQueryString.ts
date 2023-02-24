// Todo: a way to rewrite queryName, to uppercase for example

const getFindUniqueQueryString = ({ modelName, fields }: { modelName: string, fields: string }) => {
    const queryName = `findUnique${modelName}`
    return `query ${queryName}($where: ${modelName}WhereUniqueInput!) {
    ${queryName}(where: $where) {
        ${fields}
    }
}`
}

const getFindManyQueryString = ({ modelName, fields }: { modelName: string, fields: string }) => {
    const queryName = `findMany${modelName}`
    return `query ${queryName}(
        $where: ${modelName}WhereInput
        $orderBy: [${modelName}OrderByWithRelationInput!]
        $cursor: ${modelName}WhereUniqueInput
        $skip: Int
        $take: Int
    ) {
        findMany${modelName}(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
            ${fields}
        }
        count${modelName}(where: $where)
    }
`
}

export const getQueryString = ({ modelName, fields, queryType }: { modelName: string, fields: string, queryType: "findUnique" | "findMany" }) => {
    const findUnique = queryType === "findUnique";
    
    if (findUnique) return getFindUniqueQueryString({ modelName, fields })

    return getFindManyQueryString({ fields, modelName })
}