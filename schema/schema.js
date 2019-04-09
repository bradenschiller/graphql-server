const _ = require('lodash')
const graphql = require('graphql')
const axios = require('axios')

// uses all special type calling and objects from graphql
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

// * creates a user type from graphql object = {UserType}, name is user and fields are described followed by types using the graphql package
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
})

// * creates a root query for graphql to hook into name is root and fields describes user type object with set arguments being the id to query for the data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`).then((res) => res.data)
      },
    },
  },
})

// * exports the schema to the server file to use by the node js application
module.exports = new GraphQLSchema({
  query: RootQuery,
})
