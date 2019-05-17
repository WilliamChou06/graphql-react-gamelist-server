const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = graphql;

const games = [
  { name: 'Skyrim', genres: ['Fantasy', 'Action'], id: '1' },
  { name: 'Overlord', genres: ['Fantasy', 'RPG'], id: '2' }
];

const publishers = [
  { name: 'Bethesda Softworks', id: '1' },
  { name: 'Codemasters', id: '2' }
];

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genres: { type: new GraphQLList(GraphQLString) }
  })
});

const PublisherType = new GraphQLObjectType({
  name: 'Publisher',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(games, { id });
      }
    },
    publisher: {
      type: PublisherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(publishers, { id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
