/**
 *    Copyright (C) 2019 SuXueFeng
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License as
 *    published by the Free Software Foundation, either version 3 of the
 *    License, or (at your option) any later version.
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 **/

odoo.define('dingtalk.simple.groups.get.button', function (require) {
    "use strict";

    let ListController = require('web.ListController');
    let ListView = require('web.ListView');
    let viewRegistry = require('web.view_registry');
    let KanbanController = require('web.KanbanController');
    let KanbanView = require('web.KanbanView');

    let DingtalkSimpleGroupsViewController = ListController.extend({
        buttons_template: 'ListView.DingTalkSimpleGroupsButtons',
        renderButtons: function () {
            this._super.apply(this, arguments);
            if (this.$buttons) {
                let self = this;
                this.$buttons.on('click', '.get_dingtalk_simple_groups_class', function () {
                    self.do_action({
                        type: 'ir.actions.act_window',
                        res_model: 'dingtalk.simple.groups.tran',
                        target: 'new',
                        views: [[false, 'form']],
                        context: [],
                    },{
                        on_reverse_breadcrumb: function () {
                            self.reload();
                        },
                          on_close: function () {
                            self.reload();
                        }
                     });
                });
                this.$buttons.on('click', '.get_dingtalk_simple_groups_users_class', function () {
                    self.do_action({
                        type: 'ir.actions.act_window',
                        res_model: 'dingtalk.simple.groups.users.tran',
                        target: 'new',
                        views: [[false, 'form']],
                        context: [],
                    },{
                        on_reverse_breadcrumb: function () {
                            self.reload();
                        },
                          on_close: function () {
                            self.reload();
                        }
                     });
                });
            }
        }
    });

    let DingtalkSimpleGroupsListView = ListView.extend({
        config: _.extend({}, ListView.prototype.config, {
            Controller: DingtalkSimpleGroupsViewController,
        }),
    });

    viewRegistry.add('get_dingtalk_simple_groups_class', DingtalkSimpleGroupsListView);


    let DingtalkSimpleGroupsKanbanController = KanbanController.extend({
        renderButtons: function ($node) {
            let $buttons = this._super.apply(this, arguments);
            let tree_model = this.modelName;
            if (tree_model == 'dingtalk.simple.groups') {
                let but = "<button type=\"button\" class=\"btn btn-primary\">获取钉钉考勤组</button>";
                let button2 = $(but).click(this.proxy('getDingtalkSimpleGroupsBut'));
                this.$buttons.append(button2);
                let but3 = "<button type=\"button\" class=\"btn btn-secondary\">获取考勤组成员</button>";
                let button3 = $(but3).click(this.proxy('getDingtalkSimpleGroupsUsersBut'));
                this.$buttons.append(button3);
            }
            return $buttons;
        },
        getDingtalkSimpleGroupsBut: function () {
            var self = this;
            this.do_action({
                type: 'ir.actions.act_window',
                res_model: 'dingtalk.simple.groups.tran',
                target: 'new',
                views: [[false, 'form']],
                context: [],
            },{
                on_reverse_breadcrumb: function () {
                    self.reload();
                },
                  on_close: function () {
                    self.reload();
                }
            });
        },
        getDingtalkSimpleGroupsUsersBut: function () {
            var self = this;
            this.do_action({
                type: 'ir.actions.act_window',
                res_model: 'dingtalk.simple.groups.users.tran',
                target: 'new',
                views: [[false, 'form']],
                context: [],
            },{
                on_reverse_breadcrumb: function () {
                    self.reload();
                },
                  on_close: function () {
                    self.reload();
                }
            });
        },
    });

    let DingtalkSimpleGroupsKanbanView = KanbanView.extend({
        config: _.extend({}, KanbanView.prototype.config, {
            Controller: DingtalkSimpleGroupsKanbanController,
        }),
    });

    viewRegistry.add('dingtalk_simple_groups_kanban_class', DingtalkSimpleGroupsKanbanView);
});

