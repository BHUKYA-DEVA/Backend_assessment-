exports.handleUserFollow = (data) => {
    console.log('User followed:', data);
};

exports.handleUserUnfollow = (data) => {
    console.log('User unfollowed:', data);
};

exports.handleDiscussionCreate = (data) => {
    console.log('Discussion created:', data);
};

exports.handleDiscussionUpdate = (data) => {
    console.log('Discussion updated:', data);
};

exports.handleDiscussionDelete = (data) => {
    console.log('Discussion deleted:', data);
};

exports.handleDiscussionLike = (data) => {
    console.log('Discussion liked:', data);
};

exports.handleDiscussionComment = (data) => {
    console.log('Discussion commented:', data);
};

exports.handleDiscussionReply = (data) => {
    console.log('Discussion replied:', data);
};

exports.handleDiscussionLikeComment = (data) => {
    console.log('Comment liked:', data);
};
