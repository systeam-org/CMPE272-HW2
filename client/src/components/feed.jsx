// By Dhwani Sanghvi
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    marginTop:30,
    marginLeft: 'auto',
    marginRight:'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function RecipeReviewCard({text, id, user, media, count, handleRetweets, handleDeleteTweet}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={user.profile_image_url}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader="October 20, 2019"
      />
      {media &&
        <CardMedia
          className={classes.media}
          image={media}
        />
      }
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" color="red">
          <FavoriteIcon />
        </IconButton>
        <span>{count.fav}</span>
        <IconButton aria-label="re-tweet" onClick={()=> handleRetweets(id)}>
          <ShareIcon />
        </IconButton>
        <span>  {count.reTweet}</span>
        <IconButton aria-label="re-tweet" onClick={()=> handleDeleteTweet(id)}>
          <DeleteIcon />

        </IconButton>
        <span > Delete </span>
      </CardActions>
    </Card>
  );
}