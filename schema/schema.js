const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } = graphql;

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: { type: GraphQLString},
    name: { type: GraphQLString},
    genres: { type: new GraphQLList(GraphQLString)}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    game: {
      type: GameType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {

      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})