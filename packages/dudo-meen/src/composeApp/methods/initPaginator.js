module.exports = (app, Model, originItemPerPage = app.config.paginator.itemPerPage) => {
    return {
        get: async (query, page, pageSize, improveQueryBuild) => {
            let currentPage = isNaN(page) ? 1 : +page;

            if (!pageSize) {
                pageSize = originItemPerPage;
            }

            if (typeof pageSize === 'function') {
                improveQueryBuild = pageSize;
                pageSize = originItemPerPage;
            }

            let queryBuilder = Model.find(query);
            if (typeof improveQueryBuild === 'function') {
                queryBuilder = improveQueryBuild(queryBuilder);
            }

            const totalRecord = await Model.countDocuments(query);
            const totalPage = Math.ceil(totalRecord / pageSize);
            const data = await queryBuilder.skip((pageSize * currentPage) - pageSize).limit(pageSize);

            return {
                data,
                totalRecord,
                totalPage,
                currentPage,
                pageSize,
            }
        },
    };
};
