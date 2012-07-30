// a collection for input messages
Messages = new Meteor.Collection("messages");

// this code is executed at client (same as js files at client/ directory)
if (Meteor.is_client) {

  // this function is executed after all page loading and template processing
  Meteor.startup(function () {
    Meemoo.setInfo({
      title: "tunnel",
      author: "automata.cc",
      description: "distributed tunnel based on Meteor"
    }).addInputs({
      x: {
        action: function (foo) {
          // when we receive an input, we update the collection of messages
          Messages.update({input: 'x'},
                          {$set: {value: foo}});
        },
        type: "all"
      },
      y: {
        action: function (foo) {
          // when we receive an input, we update the collection of messages
          Messages.update({input: 'y'},
                          {$set: {value: foo}});
        },
        type: "all"
      },
      z: {
        action: function (foo) {
          // when we receive an input, we update the collection of messages
          Messages.update({input: 'z'},
                          {$set: {value: foo}});
        },
        type: "all"
      }
    }).addOutputs({
      x: {
        type: "all"
      },
      y: {
        type: "all"
      },
      z: {
        type: "all"
      }
    });
  });

  // templates have functions. this will list the messages and observe
  // their state change at same time.
  Template.main.messages = function () {
    // we get all the messages
    var q = Messages.find();
    // and observe them for changing
    q.observe({
      changed: function (m) {
        // when a message change we send that to output
        Meemoo.send(m.input, m.value);
      }
    });
    // we also return all the messages to show at template
    return q;
  };
}

// this code is executed only in the server
if (Meteor.is_server) {
  Meteor.startup(function () {
    // just start the collection with data if it is empty
    if (Messages.find().count() == 0) {
      Messages.insert({input: 'x',
                       value: null});
      Messages.insert({input: 'y',
                       value: null});
      Messages.insert({input: 'z',
                       value: null});
    }
  });
}