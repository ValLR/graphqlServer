const graphql = require('graphql');
const anxios = require('axios');
const { default: axios } = require('axios');

const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = graphql;

const Post = new GraphQLObjectType({
    name: 'PostType',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    })
});

const PaginateOptions = new GraphQLInputObjectType({
    name: 'PaginateOptionsType',
    fields: () => ({
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt }
    })
});

const PaginationInput = new GraphQLInputObjectType({
    name: 'PaginationInputType',
    fields: () => ({
        paginate: { type: PaginateOptions },
    })
});

const PostPage = new GraphQLObjectType({
    name: 'PostPageType',
    fields: () => ({
        data: { type: GraphQLList(Post) },
    })
});

const UpdatePostInput = new GraphQLInputObjectType({
    name: 'UpdatePostInput',
    fields: () => ({
        body: { type: GraphQLString }
    })
});

const UpdatePost = new GraphQLObjectType({
    name: 'UpdatePost',
    fields: () => ({
        id: { type: GraphQLID },
        body: { type: GraphQLString }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: { // DEFINES ALL THE FIELDS IN A TYPE
        posts: {
            type: PostPage,
            args: {
                options: { type: PaginationInput }
            },
            resolve (parentValue, args) {
                return axios.get(`http://localhost:3000/posts`)
                .then(res => {
                    console.log('RESPONSE', res);
                    return res;
                })
            }
        },
        post: {
            type: Post,
            args: {
                id: { type: GraphQLString }
            },
            resolve (parentValue, args) {
                return axios.get(`http://localhost:3000/posts/${args.id}`)
                .then(res => {
                    console.log(res.data);
                    return res.data;
                })
            }
        },
        data: {
            type: GraphQLString,
            resolve (parentValue, args) {
                return 'Hello, Graphql!'
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        updatePost: {
            type: UpdatePost,
            args: {
                id: { type: GraphQLID },
                input: { type: UpdatePostInput }
            },
            resolve (parentValue, args) {
                return axios.put(`http://localhost:3000/posts/${args.id}`)
                .then(res => {
                    console.log(res.data);
                    return res.data;
                })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
