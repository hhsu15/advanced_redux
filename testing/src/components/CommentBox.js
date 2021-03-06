import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import requireAuth from "components/requireAuth";

class CommentBox extends React.Component {
  state = {
    comment: "",
  };

  handleChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.saveComment(this.state.comment);

    this.setState({ comment: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>Add a comment</h4>
          <textarea onChange={this.handleChange} value={this.state.comment} />
          <div>
            <button>Submit Comment</button>
          </div>
        </form>
        <button className="fetch-comments" onClick={this.props.fetchComments}>
          Fetch comments
        </button>
      </div>
    );
  }
}

export default connect(null, actions)(requireAuth(CommentBox));
