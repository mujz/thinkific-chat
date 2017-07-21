<chat>
  <header>
      <nav>
          <div class="nav-wrapper">
              <a href="/" class="brand-logo right">Simple Chat</a>
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
          <div class="input-field col s4">
              <button class="waves-effect waves-light btn" />
                  <i class="material-icons right">done</i>
                  Join
              </button>
          </div>
      </div>
  </main>
  <footer class="page-footer">
  </footer>

  <script>

    self.on('mount', function(){
      console.log('test3', test3) // Succeeds, fires once (per mount)
      var self = this;
      this.ws = new WebSocket('ws://' + window.location.host + '/ws');
      this.ws.addEventListener('message', function(e) {
          var msg = JSON.parse(e.data);
          self.chatContent += '<div class="chip">'
                  + '<img src="' + self.gravatarURL(msg.email) + '">' // Avatar
                  + msg.username
              + '</div>'
              + emojione.toImage(msg.message) + '<br/>'; // Parse emojis

          var element = document.getElementById('chat-messages');
          element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
      });

    })
  </script>
</chat>
