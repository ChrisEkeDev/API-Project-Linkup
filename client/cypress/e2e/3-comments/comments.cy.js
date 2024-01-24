const url = 'http://localhost:3000/sessions/1'

// SESSION 1

const comments = '.comments__list li';
const newCommentInput = '.new-comment .comment__input';
const createCommentToggle = '.toggle-new-button';
const createCommentConfirm = '.confirm-new-button';
const createReplyToggle = '.toggle-reply-button';
const createReplyConfirm = '.confirm-reply-button';
const updateCommentToggle = '.toggle-update-button';
const updateCommentConfirm = '.confirm-update-button';
const deleteCommentToggle = '.toggle-delete-button';
const deleteCommentConfirm = '';

describe('Ceate a Comment', () => {
    beforeEach(() => {
        cy.visit(url)
    })

    it('Displays all the comments of the selected session by default', () => {
        cy.get(comments).should('have.length', 3);
    })

    it('Creates a comment, and displays the comment on screen', () => {
        cy.get(createCommentToggle).click();

        cy.get(newCommentInput).type('Testing the creation of comments');
        cy.get(createCommentConfirm).click();

        cy.get(comments).should('have.length', 4);
    })
})
