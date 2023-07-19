const db = require("../data/data-config");
const commentsModel = require("../api/comments/comments-model");


beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db.seed.run();
});

describe('---------- GET ALL COMMENTS ----------', () => {
    test('1 - get all comments', async () => {
        const comments = await commentsModel.getAllComments();
        expect(comments).toHaveLength(9);
    });
});

describe('---------- GET COMMENT BY ID ----------', () => {
    test('2 - get comment by comment_id', async () => {
        const comment = await commentsModel.getCommentById(2);
        expect(comment.commentContent).toMatch("comment 2");
        expect(comment.user_id).toBe(1);
    });
});

describe('---------- GET COMMENTS OF TWEET ----------', () => {
    test('3 - get comments of tweet by tweet_id', async () => {
        let comments = await commentsModel.getCommentsOfTweet(1);
        expect(comments).toHaveLength(2);
        comments = await commentsModel.getCommentsOfTweet(3);
        expect(comments).toHaveLength(1);
        expect(comments[0].commentContent).toMatch("comment 5");
    });
});

describe('---------- UPDATE COMMENT ----------', () => {
    test('4 - update comment', async () => {
        await commentsModel.updateComment(1, {commentContent: "test"});
        const updatedComment = await commentsModel.getCommentById(1)
        expect(updatedComment).toHaveProperty("commentContent", "test");

    });
});

describe('---------- DELETE COMMENT ----------', () => {
    test('5 - delete comment', async () => {
        const deletedComment = await commentsModel.deleteComment(5);
        const comments = await commentsModel.getAllComments();
        expect(comments).toHaveLength(8);
        expect(deletedComment).toHaveProperty("user_id", 3);
    });
});

describe('---------- CREATE COMMENT ----------', () => {
    test('6 - create comment', async () => {
        const createdComment = await commentsModel.createComment({commentContent: "test"});
        expect(createdComment.comment_id).toBe(10);
        const comments = await commentsModel.getAllComments();
        expect(comments).toHaveLength(10);
    });
});
