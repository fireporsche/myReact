/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-17.
 */
import React, {PropTypes, Component} from "react";

export default class Posts extends Component {
    render() {
        return (
            <ul>
                {this.props.posts.map((post, i) =>
                    <li key={i}>{post.title}</li>
                )}
            </ul>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}
