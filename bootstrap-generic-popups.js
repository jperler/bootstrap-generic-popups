(function($) {

    var BGP = $.BootstrapGenericPopups = {};

    BGP.tpl = '\
    <div id="{{id}}" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="{{label}}" aria-hidden="true">\
        <div class="modal-header">\
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
            <h3 id="{{label}}">{{title}}</h3>\
        </div>\
        <div class="modal-container">\
            <div class="modal-body"><p>{{msg}}</p></div>\
            <div class="modal-footer">\
                <button class="deny btn">{{deny_text}}</button>\
                <button class="confirm btn btn-primary">{{confirm_text}}</button>\
            </div>\
        </div>\
    </div>';

    BGP.UID = function() {
        return Math.random().toString().substring(2);
    };

    BGP.popup = function(options, defaults) {
        options = options || {};
        defaults = defaults || {};

        var id = BGP.UID(),
            tpl = BGP.tpl,

        options = $.extend({}, defaults, options);

        // replace properties in template
        tpl = tpl.replace('{{id}}', id);
        tpl = tpl.replace('{{label}}', id);
        tpl = tpl.replace('{{title}}', options.title);
        tpl = tpl.replace('{{msg}}', options.msg);
        tpl = tpl.replace('{{confirm_text}}', options.confirm_text);
        tpl = tpl.replace('{{deny_text}}', options.deny_text);

        // add template to the dom
        $('body').append(tpl);

        var $modal = $('#' + id);

        // instantiate the modal
        if (options.closeable) {
            $modal.modal();
        } else {
            $modal.find('button.close').remove();
            $modal.modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        if (!options.show_buttons)
            $modal.find('.modal-footer button').hide();

        if (options.alert)
            $modal.find('.deny').hide();

        // add event handlers
        $modal.find('.confirm').click(function() {
            options.confirm();
            $modal.modal('hide');
        });

        $modal.find('.deny').click(function() {
            options.deny();
            $modal.modal('hide');
        });

        // cleanup
        $modal.on('hide', function() {
            $(this).remove();
        });

        return $modal;
    };

    BGP.confirm = function(options) {
        return this.popup(options, {
            msg: '',
            confirm_text: 'Yes',
            deny_text: 'No',
            title: 'Confirm',
            closeable: true,
            show_buttons: true,
            alert: false,
            confirm: function() {},
            deny: function() {}
        });
    };

    BGP.alert = function(options) {
        return this.popup(options, {
            msg: '',
            confirm_text: 'Ok',
            deny_text: '',
            title: 'Alert',
            closeable: true,
            show_buttons: true,
            alert: true,
            confirm: function() {},
            deny: function() {}
        });
    };

}(jQuery));
