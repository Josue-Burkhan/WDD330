export default class Comments {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.comments = [];
  }

  async init() {
    this.comments = await this.dataSource.getComments(this.productId);
    this.renderComments();
    document
      .getElementById("addCommentForm")
      .addEventListener("submit", this.addComment.bind(this));
  }

  renderComments() {
    const commentList = document.getElementById("comment-list");
    commentList.innerHTML = this.comments
      .map((comment) => this.renderComment(comment))
      .join("");
  }

  renderComment(comment) {
    return `<div class="comment">
      <p class="comment-author">${comment.name}</p>
      <p class="comment-text">${comment.text}</p>
    </div>`;
  }

  async addComment(event) {
    event.preventDefault();
    const commentText = document.getElementById("comment-text").value;
    if (!commentText) return;

    const comment = {
      productId: this.productId,
      text: commentText,
      name: "Anonymous", // Or get user name from somewhere
    };

    try {
      await this.dataSource.addComment(comment);
      document.getElementById("comment-text").value = "";
      this.init(); // Re-initialize to fetch and render all comments
    } catch (error) {
      console.error("Error adding comment:", error);
      // Optionally, show an error message to the user
    }
  }
}
