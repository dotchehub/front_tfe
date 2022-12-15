const likeAUser = async (me_id, likedUserId) => {
  const requestOptions = {
    method: "POST",

    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `https://vinderbe.azurewebsites.net/users/addLike/${me_id}/${likedUserId}`,

    requestOptions
  );

  const data = response.json();
  return data;
};

const dislikeUser = async (me_id, dislikedUserId) => {
  const requestOptions = {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({
      id_liker: me_id,

      id_liked: dislikedUserId,
    }),
  };

  const response = await fetch(
    "https://vinderbe.azurewebsites.net/users/dislike",

    requestOptions
  );
};

export { likeAUser, dislikeUser };
