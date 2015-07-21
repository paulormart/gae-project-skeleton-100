/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';

    var UserModel = function () {
        var _self = this;
        _self.key_url = null;
        _self.username = null;
        _self.email = null;
        _self.token = null;
        _self.role = '';
    };

    UserModel.prototype = {
        setToken: function (token) {
            token = token || null;
            this.token = token;
        },
        getToken: function(){
            return this.token;
        },
        isAuthorized: function(level){
            if (!level) { return false }
            if (level > 1){
                return this.username ? this.role >= level : false;
            }
            else {
                return true;
            }
        },
        getShortName: function(){
            return this.first_name ? this.first_name : this.username;
        },
        getFullName: function (){
            return this.first_name && this.last_name ? this.first_name + ' ' + this.last_name : null;
        },
        isLoggedIn: function(){
            return this.username ? true: false;
        },
        getUsername: function(){
            return this.username;
        },
        getKeyUrl: function(){
            return this.key_url;
        }
    };

    angular.module('authentication.services').value('UserModel', UserModel);
})();