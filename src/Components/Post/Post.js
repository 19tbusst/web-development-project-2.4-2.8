// Module imports
import {
    useState,
    useEffect
} from 'react'
import { handleLike } from '../../firebase'

// Icon imports
import { IoMdThumbsUp } from 'react-icons/io'


// Export the Post component
export default function Post(props) {
    const {
        author,
        authorUrl,
        desc,
        image,
        tags,
        likes,
        id,
        userLikes
    } = props

    // States
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(likes)

    // Likes the post 
    // then inverts the liked state and updates the likes count
    const handleLikeClick = (id) => {
        handleLike(id, !liked)
        setLiked(!liked)
        setLikesCount(liked ? likesCount - 1 : likesCount + 1)
    }

    // Checks if the user has liked the post
    // If so, sets the liked state to true
    useEffect(() => {
        if (userLikes) {
            Object.keys(userLikes).forEach((key) => {
                if (userLikes[key] === id) setLiked(true)
            })
        }
    }, [userLikes, id])

    // Return the post
    return (
        <article className='Post'>
            <img src={image} alt={desc} />
            <div className='Post-info'>
                <p>{desc}</p>
                <div className='Post-stats'>
                    <h3
                        className='likeCount'
                        // If the user has liked the post,
                        // color the icon and text
                        style={liked ? { color: '#e3b706' } : {}}
                    >
                        <button
                            onClick={() => handleLikeClick(id)}
                            style={liked ? { color: '#e3b706' } : {}}
                        >
                            <IoMdThumbsUp />
                        </button> {likesCount}
                    </h3>
                    <div className="vl" />
                    <div className='Post-tags'>
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className='Tag'
                            >{tag}</span>
                        ))}
                    </div>
                    <div className="vl" />
                    <h3>{author}</h3>
                    <img
                        className='Post-author-image'
                        src={authorUrl}
                        alt={author}
                    />
                </div>
            </div>
        </article >
    );
};