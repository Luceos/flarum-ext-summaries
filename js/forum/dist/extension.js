System.register('jordanjay29/summaries/addSummaryExcerpt', ['flarum/extend', 'flarum/components/DiscussionList', 'flarum/components/DiscussionListItem', 'flarum/utils/string'], function (_export) {
  'use strict';

  var extend, DiscussionList, DiscussionListItem, truncate;

  _export('default', addSummaryExcerpt);

  function addSummaryExcerpt() {
    extend(DiscussionList.prototype, 'requestParams', function (params) {
      params.include.push('startPost');
    });

    extend(DiscussionListItem.prototype, 'infoItems', function (items) {
      var discussion = this.props.discussion;

      var startPost = discussion.startPost();

      if (startPost) {
        var excerpt = m(
          'span',
          null,
          truncate(startPost.contentPlain(), 200)
        );

        items.add('excerpt', excerpt, -100);
      }
    });
  }

  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsDiscussionList) {
      DiscussionList = _flarumComponentsDiscussionList['default'];
    }, function (_flarumComponentsDiscussionListItem) {
      DiscussionListItem = _flarumComponentsDiscussionListItem['default'];
    }, function (_flarumUtilsString) {
      truncate = _flarumUtilsString.truncate;
    }],
    execute: function () {}
  };
});;
System.register('jordanjay29/summaries/main', ['flarum/extend', 'flarum/app', 'jordanjay29/summaries/addSummaryExcerpt'], function (_export) {
  'use strict';

  var extend, notificationType, app, addStickyExcerpt;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
      notificationType = _flarumExtend.notificationType;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_jordanjay29SummariesAddSummaryExcerpt) {
      addStickyExcerpt = _jordanjay29SummariesAddSummaryExcerpt['default'];
    }],
    execute: function () {

      app.initializers.add('jordanjay29-summaries', function () {
        addSummaryExcerpt();
      });
    }
  };
});