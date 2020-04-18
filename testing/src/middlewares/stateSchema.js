export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "http://example.com/example.json",
  type: "object",
  title: "The Root Schema",
  description: "The root schema comprises the entire JSON document.",
  required: ["auth", "comments"],
  properties: {
    auth: {
      $id: "#/properties/auth",
      type: "boolean",
      title: "The Auth Schema",
      description: "An explanation about the purpose of this instance.",
      default: false,
      examples: [true],
    },
    comments: {
      $id: "#/properties/comments",
      type: "array",
      title: "The Comments Schema",
      description: "An explanation about the purpose of this instance.",
      default: [],
      items: {
        $id: "#/properties/comments/items",
        type: "string",
        title: "The Items Schema",
        description: "An explanation about the purpose of this instance.",
        default: "",
        examples: ["string1", "string2"],
      },
    },
  },
};
