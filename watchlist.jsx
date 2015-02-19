'use strict';

var Movie = React.createClass({

    render: function() {
        var url = 'movies/' + this.props.title;

        return (
            <div className="movie">
                <a className="title" href={url}>{this.props.title}</a>
            </div>
        );
    }

});

var MovieList = React.createClass({

    render: function() {
        var movies = this.props.data.map(function (movie) {
            return (
                <Movie title={movie.title} />
            );
        });

        return (
            <div className="movie-list">
                <h2 className="title">Movies</h2>
                {movies}
            </div>
        );
    }

});

var Friend = React.createClass({

    render: function() {
        return (
            <div className="friend">
                <a className="username">{this.props.username}</a>
            </div>
        );
    }

});

var FriendList = React.createClass({

    render: function() {
        var friends = this.props.data.map(function (friend) {
            return (
                <Friend username={friend.username} />
            );
        });

        return (
            <div className="friend-list">
                <h2 className="title">Friends</h2>
                {friends}
            </div>
        );
    }

});

var User = React.createClass({

    render: function() {
        return (
            <div className="user">
                <h2 className="username">{this.props.data.username}</h2>
                <MovieList data={this.props.data.movies} />
                <FriendList data={this.props.data.friends} />
            </div>
        );
    }

});


var user = {
    username: 'jsmith',
    movies: [
        {
            title: 'Lord of the Rings',
        },
        {
            title: 'Inception'
        }
    ],
    friends: [
        {
            username: 'jdoe'
        }
    ]
};

React.render(
    <User data={user} />,
    document.getElementById('content')
);
