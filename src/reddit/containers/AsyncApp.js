/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-17.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ACTION from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {
    static propTypes = {
        selectedSubreddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const {dispatch, selectedSubreddit} = this.props
        dispatch(ACTION.fetchPostsIfNeeded(selectedSubreddit))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const { dispatch, selectedSubreddit} = nextProps
            dispatch(ACTION.fetchPostsIfNeeded(selectedSubreddit))
        }
    }

    handleChange(nextSubreddit) {
        this.props.dispatch(ACTION.selectSubreddit(nextSubreddit))
    }

    handleRefreshClick(e) {
        e.preventDefault()

        const { dispatch, selectedSubreddit} = this.props
        dispatch(ACTION.invalidateSubreddit(selectedSubreddit))
        dispatch(ACTION.fetchPostsIfNeeded(selectedSubreddit))
    }

    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
        return (
            <div>
                <Picker value={selectedSubreddit}
                        onChange={this.handleChange}
                        options={[ 'reactjs', 'frontend' ]} />
                <p>
                    {lastUpdated &&
                    <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
            </span>
                    }
                    {!isFetching &&
                    <a href='#'
                       onClick={this.handleRefreshClick}>
                        Refresh
                    </a>
                    }
                </p>
                {isFetching && posts.length === 0 &&
                <h2>Loading...</h2>
                }
                {!isFetching && posts.length === 0 &&
                <h2>Empty.</h2>
                }
                {posts.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts} />
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)
