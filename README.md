bootstrap-generic-popups
========================

Simple jQuery plugin for Twitter Bootstrap to allow for the creation of generic popups. The idea was to replicate Javascript's alert and confirm functionality using Bootstrap's modal.
    
    $.BootstrapGenericPopups.confirm({
      msg: "Are you sure?",
      confirm_text: "Yes",
      deny_text: "No",
      confirm: function() { doSomething(); }),
      deny: function() { doSomethingElse(); })
    })
