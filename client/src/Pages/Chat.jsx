import axios from 'axios';
import pdfjsLib from 'pdfjs-dist';
import React, { useState, useEffect, useRef } from 'react';
import '../Pages/Chat.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faComment, faEllipsis, faTrashCan, faUser, faUserCircle, faSignOut, faLevelUp } from '@fortawesome/free-solid-svg-icons';  

function Chat() {
  const [pdf, setPDF] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('Import PDF here');
  const [isFileChosen, setIsFileChosen] = useState(false);
  const [showFiles, setShowFiles] = useState(true);
  const fontSize = '1.3rem';
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const uploadedFileName = query.get('fileName');
    if (uploadedFileName) {
      setFileName(uploadedFileName);
      setIsFileChosen(true);
    }
  }, [location]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPDF(URL.createObjectURL(file));
      setFileName(file.name);
      setIsFileChosen(true);
      setShowFiles(true);
      setSelectedFile(file);

      setMessages([
        {
          sender: 'bot',
          content: `You can now ask questions related to the uploaded file "${file.name}".`
        }
      ]);
    }
  };

  const toggleMenu = () => {
    const subMenu = document.getElementById('subMenu');
    subMenu.classList.toggle('open-menu');
  };

  const clearConversations = () => {
    setPDF(null);
    setFileName('Import PDF here');
    setIsFileChosen(false);
    setSelectedFile(null);
    setShowFiles(false);
    setUserInput('');
  };
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8080/chat', {
        prompt: inputValue,
      });
  
      const userMessage = { content: inputValue, sender: 'user' };
      const botMessage = { content: response.data, sender: 'bot' };
      setMessages([...messages, userMessage, botMessage]);
  
      setInputValue('');
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendButtonClick = () => {
    if (inputValue) {
      setMessages([...messages, { content: inputValue, sender: 'user' }]);
      setInputValue('');
      sendMessage();
      scrollToBottom(); 
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendButtonClick();
    }
  }; 
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  return (
    <div>
      <div className='body'>
        <div className='side'>
          {/* top of the sidebar */}
            <div className='sidebar_header'>

            <Link to='/smartreview' className='link_to_smartreview'>
              <button className='smartreview_button'>
                SmartReview PDF
              </button>
            </Link>

            {/* PDF import section */}
            <div className='form_wrapper'>
              <form
                className='form_pdfFile_import'
                action=''
                onClick={() => document.querySelector('.pdfFile_import').click()}
              >
                <input
                  type='file'
                  accept='.pdf'
                  className='pdfFile_import'
                  hidden
                  onChange={handleFileChange}
                />

                {isFileChosen ? (
                  <div>

                    <section className='file_upload_section'>
                      <span className='chosen_filename_text' title={fileName}>
                        <p>Import PDF here</p>
                        <FontAwesomeIcon icon={faCloudUpload} className='upload_icon'/>
                      </span>
                    </section>

                  </div>
                ) : (
                  <span className='new_chat'>
                    <p className='new_chat_text'>+ New Chat</p>
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                  </span>
                )}
              </form>
            </div>

            {isFileChosen && (
            <div className='pdf_list'>
                <p>
                    <FontAwesomeIcon icon={faComment} className='pdf_list_icon'/>
                    {fileName.length > 21 ? `${fileName.slice(0, 21)}..` : fileName}
                </p>
            </div>
            )}

          </div>

                {/* bottom of the sidebar */}
                    <div className='sidebar_footer'>
                      <div><FontAwesomeIcon className='footer_iconn' icon={faUserCircle} /></div>
                      <div className='footer_namee' style={{ color: 'white' }}>
                        Account Settings</div>
                      <div> 
                        <FontAwesomeIcon 
                          className='footer_icon_ellip' 
                          icon={faEllipsis} 
                          onClick={toggleMenu}
                        /></div>
                    

                    <div className='submenu_wrapper' id='subMenu'>
                        <div className='submenu'>
                            <p onClick={clearConversations}><FontAwesomeIcon icon={faTrashCan} className='option_icons' /> Clear conversations</p>
                            <p><FontAwesomeIcon icon={faLevelUp} className='option_icons' /> Upgrade</p>
                            <Link to='/signup' className='option_links'>
                                <p><FontAwesomeIcon icon={faSignOut} className='option_icons' /> Logout</p>
                            </Link>
                        </div>
                    </div>

          </div>
        </div>

        <div className='main'>
          {/* main navigation bar */}
          <div className='main_header'>
          <div className='mainheader-title' style={{fontSize}}>
              {fileName !== 'Import PDF here' ? fileName : 'Chat with ScriptScribe'}
            </div>
            <FontAwesomeIcon className='icon_trash' icon={faTrashCan} />
          </div>

          {/* page content --- footer*/}
          <div className='main_footer'>
            <div className='main_footer-page'>
            <section className='bubblechat_display'>
                  {isFileChosen ? (
                    <div className='chat_container' style={{marginBottom: '100px'}}>
                      <div>
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={message.sender === 'user' ? 'bubblechat2' : 'bubblechat'}
                          >
                            {message.sender !== 'user' && (
                              <div className='chatbot'>
                                <i className="fa-sharp fa-solid fa-robot"></i>
                              </div>
                            )}
                            <span className='spanforbubble'>
                              <p className='p2'>{message.content}</p>
                            </span>
                            {message.sender === 'user' && (
                              <div className='chatuser'>
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className='p'
                                  style={{ width: 20, height: 20 }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                      </div>
                    </div>
                    
                  ) : (
                    <p className='main_p'>No file chosen</p>
                  )}
                </section>




                {isFileChosen && (
                  
                    <div className='chatbar'>

                      <input className='chatbar_input' placeholder='Send a question here.' onKeyDown={handleKeyDown} onChange={handleInputChange} value={inputValue} id='chat_input' type='text' />

                      <button className='send_button' onClick={handleSendButtonClick}>
                        <div className="svg-wrapper-1">
                          <div className="svg-wrapper">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0h24v24H0z" fill="none"></path>
                              <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                            </svg>
                          </div>
                        </div>
                      </button>

                    </div>
                )}

            </div>
          </div>
          
          {isFileChosen && (
          <div className='rectangle'></div>
          )}

        </div>


      </div>
    </div>
  );
}

export default Chat;
