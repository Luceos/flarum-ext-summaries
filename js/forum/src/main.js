import { extend, notificationType } from 'flarum/extend';
import app from 'flarum/app';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';

import addStickyExcerpt from 'flarum/sticky/addStickyExcerpt';

app.initializers.add('flarum-summary', () => {
  app.postComponents.discussionStickied = DiscussionStickiedPost;

  Discussion.prototype.isSticky = Model.attribute('isSticky');
  Discussion.prototype.canSticky = Model.attribute('canSticky');

  addStickyBadge();
  addStickyControl();
  addSummaryExcerpt();
});