<app>
  <header>
      <nav>
          <div class="nav-wrapper">
              <a href="/" class="brand-logo">ThinkChat</a>
          </div>
      </nav>
  </header>
  <main id="app">
      <div class="row">
          <div class="col s12">
              <div class="card horizontal">
                  <div id="chat-messages" class="card-content">
                  </div>
              </div>
          </div>
      </div>
      <div class="row" v-if="joined">
          <div class="input-field col s8">
              <input type="text" />
          </div>
          <div class="input-field col s4">
              <button class="waves-effect waves-light btn">
                  <i class="material-icons right">chat</i>
                  Send
              </button>
          </div>
      </div>
      <div class="row" v-if="!joined">
          <div class="input-field col s8">
              <input type="email" placeholder="Email"/>
          </div>
          <div class="input-field col s8">
              <input type="text" placeholder="Username"/>
          </div>
          <div class="input-field col s4 onclick={ join }">
              <button class="waves-effect waves-light btn" />
                Join
              </button>
          </div>
      </div>
  </main>

  <script>
    var self = this;
    
    self.ws = null
    self.newMsg = ""
    self.chatContent = ""
    self.email = null
    self.username = null
    self.joined = false
    
    self.on('mount', function(){
      this.ws = new WebSocket('ws://localhost:8080/ws');
      this.ws.addEventListener('message', function(e) {
        var msg = JSON.parse(e.data);
        debugger
        self.chatContent += '<div class="chip">'
          + '<img src="' + self.gravatarURL(msg.email) + '">'
          + msg.username
          + '</div>'
          + emojione.toImage(msg.message) + '<br/>'; 

        var element = document.getElementById('chat-messages');
        element.scrollTop = element.scrollHeight;
      });

    });
    
    function join(e) {
       if (!this.email) {
         Materialize.toast('You must enter an email', 2000);
         return
       }
       if (!this.username) {
         Materialize.toast('You must choose a username', 2000);
         return
       }
       this.email = $('<p>').html(this.email).text();
       this.username = $('<p>').html(this.username).text();
       this.joined = true;
     };
    
    
  </script>
  
  <style>
    body {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    main {
        flex: 1 0 auto;
    }
    
    nav {
      background-color: #6659b0;
    }
    
    .btn {
      background-color: #6659b0;      
    }

    #chat-messages {
        min-height: 10vh;
        height: 60vh;
        width: 100%;
        overflow-y: scroll;
    }
  </style>
</app>
