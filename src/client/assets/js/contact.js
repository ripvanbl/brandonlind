(function(document) {
    /* global React */
    /* global ReactDOM */
    /* global axios */
    
    class ContactForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = { isSubmitting: false, message: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.messageInput = React.createRef();
      }
      
      handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitting: true });
        
        const name = this.nameInput.current.value;
        const email = this.emailInput.current.value;
        const message = this.messageInput.current.value;
        
        if (!name || !email || !message) {
          this.setState({
            message: 'Name, email, and a message are all required to be filled in.',
            isSubmitting: false
          });
        
        return;
        }
        
        const data = { name, email, message };
        const that = this;
        
        this.setState({ isSubmitting: true, message: '' });
        
        if(location.search && location.search.match(/\?test/).length) {
          that.setState({ isSubmitting: false, message: `Thank you for your message.` });
          that.resetForm();
          return;
        }

        axios.post('//api.brandonlind.com/v1/contact', data)
          .then(function (response) {
            console.log(response);
            that.setState({ isSubmitting: false, message: `Thank you for your message.` });
            that.resetForm();
          })
          .catch(function (error) {
            console.log(error);
            that.setState({ isSubmitting: false, message: `Your message could not be sent for some reason.` });
          });
      }

      resetForm() {
        this.nameInput.current.value = '';
        this.emailInput.current.value = '';
        this.messageInput.current.value = '';
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <p><strong>{this.state.message}</strong></p>
            <div class="fields">
              <div class="field half">
                <label for="name">Your Name</label>
                <input type="text" required maxlength="100" ref={this.nameInput} />
              </div>
              <div class="field half">
                <label for="email">Your Email</label>
                <input type="email" required maxlength="100" ref={this.emailInput} />
              </div>
              <div class="field">
                <label for="message">Your Message to Me</label>
                <textarea rows="6" required maxlength="1000" ref={this.messageInput}></textarea>
              </div>
            </div>
            <ul class="actions special stacked">
              <li><button type="submit" disabled={this.state.isSubmitting}>Send Message</button></li>
              <li><strong>{this.state.message}</strong></li>
            </ul>
          </form>
        );
      }
    }
    
    ReactDOM.render(
      <ContactForm />,
      document.getElementById('contactme-component')
    );
})(document);