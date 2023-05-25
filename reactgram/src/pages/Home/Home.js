import React from 'react';
import { useState, useEffect } from "react";
import "./Home.css";
import {
	HeartFill,
	Heart,
	Chat
} from 'react-bootstrap-icons';

// ChatFill --- Importar

function Home() {
	const [likedPosts, setLikedPosts] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [isCommentValid, setIsCommentValid] = useState(false);
	const [posts, setPosts] =  useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/Publish')
			.then((response) => response.json())
			.then((data) => {
				setPosts(shuffleArray(data));
			})
			.catch((error) => console.error(error));
	}, []);

	// função para embaralhar um array (publicações)
	function shuffleArray(array) {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	}

	// se não estiver vazio permite enviar o comentário
	useEffect(() => {
		setIsCommentValid(commentText.trim().length > 0);
	}, [commentText]);

	function handleLike(postId) {
		const index = likedPosts.indexOf(postId);

		if (index === -1) {
			// o post não foi curtido, adiciona a curtida
			setLikedPosts([...likedPosts, postId]);
			setPosts(posts.map((post) => {
				if (post.id === postId) {
					return {...post, likes: post.likes + 1};
				}
				return post;
			}));
		} else {
			// o post já foi curtido, remove a curtida
			const newLikedPosts = [...likedPosts];
			newLikedPosts.splice(index, 1);
			setLikedPosts(newLikedPosts);
			setPosts(posts.map((post) => {
				if (post.id === postId) {
					return {...post, likes: post.likes - 1};
				}
				return post;
			}));
		}
	}

	function handleComment(postId) {
		setPosts(
			posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [
							...(post.comments || []),
							{ author: "", text: commentText },
						],
					};
				}
				return post;
			})
		);
		setCommentText("");
	}

	const handleDeleteComment = (postId, commentIndex) => {
		const updatedPosts = posts.map((post) => {
			if (post.id === postId) {
				const updatedComments = [...post.comments];
				updatedComments.splice(commentIndex, 1);
				return {
					...post,
					comments: updatedComments,
					commentsArray: updatedComments.length,
				};
			}
			return post;
		});
		setPosts(updatedPosts);
	};

	return (
		<div className="home-container">
			{posts.map((post) => (
				<div className="post" key={post.id}>
					<div className="post-header">
						<img className="profile-pic" src={post.image} alt="profile pic" />
						<div className="post-author">
							<span className="author-name">{post.author}</span>
						</div>
					</div>
					<img className="post-image" src={post.image} alt="post" />
					<div className="post-footer">
						<div className="post-actions">
							<div className="post-action">
								<i onClick={() => handleLike(post.id)}
								   className={likedPosts.includes(post.id) ? 'like-icon liked' : 'like-icon'}>
									{likedPosts.includes(post.id) ? <HeartFill size={20} color="red" /> : <Heart size={20}/> }
								</i>
								<span className="action-text">{post.likes} Curtidas </span>
							</div>
							<div className="post-action">
								<Chat size={22} />
								<span className="action-text">{post.comments.length} Comentários </span>
							</div>
						</div>
						<div className="post-comments">
							<div className="comments-container">
								{post.comments && post.comments.map((comment, index) => (
									<div className="comment" key={index}>
										<span className="comment-author">{comment.author}</span>
										<span className="comment-text">{comment.text}</span>
										<i
											className="delete-comment-icon"
											onClick={() => handleDeleteComment(post.id, index)}
										>
											X
										</i>
									</div>
								))}
							</div>
						</div>
						<div className="add-comment">
							<input
								className="comment-box"
								type="text" placeholder="Adicione um comentário"
								value={commentText} onChange={(e) => setCommentText(e.target.value)}
								onKeyPress={(e) => {if (e.key === 'Enter')
									handleComment(post.id)}}
							/>
							<button
								className="comment-button"
								onClick={() => handleComment(post.id)}
								disabled={!isCommentValid}> Enviar
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Home;