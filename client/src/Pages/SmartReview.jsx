import React, { useState } from 'react';
import '../css/SmartReview.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faFilePdf, faArrowAltCircleLeft, faEllipsis, faTrashCan, faUserCircle, faSignOut, faLevelUp } from '@fortawesome/free-solid-svg-icons';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';


const PDFViewerComponent = ({ pdf }) => {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          <Document file={pdf}>
            <Page pageNumber={1} width={window.innerWidth} />
          </Document>
        </PDFViewer>
      </div>
    );
  };  

function SmartReview() {
  const [pdf, setPDF] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('Import PDF here');
  const [isFileChosen, setIsFileChosen] = useState(false);
  const [showFiles, setShowFiles] = useState(true);
  const fontSize = '1.3rem';

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPDF(URL.createObjectURL(file));
      setFileName(file.name);
      setIsFileChosen(true);
      setShowFiles(true);
      setSelectedFile(file);
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
  };
  

  return (
    <div>
      <div className='body'>
        <div className='side'>
          {/* top of the sidebar */}
          <div className='sidebarheader'>

          <Link to='/chat' className='link_to_chat'>
            <button className='back_to_chat_button'>
             <p>Back to Chat</p>
             <i class="fa-sharp fa-solid fa-rotate-left"></i>
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
                    <FontAwesomeIcon icon={faFilePdf} className='pdf_list_icon'/>
                    {fileName.length > 21 ? `${fileName.slice(0, 21)}..` : fileName}
                </p>
            </div>
            )}

          </div>

            {/* bottom of the sidebar */}
            <div className='sidebar_footer'>
              <div>
                <FontAwesomeIcon className='footer_iconn' icon={faUserCircle} />
              </div>
              <div className='footer_namee' style={{ color: 'white' }}>
                Account Settings
            </div>

            {/* account settings */}
            <div>
              <FontAwesomeIcon 
                className='footer_icon_ellip' 
                icon={faEllipsis}
                onClick={toggleMenu} 
              />
            </div>
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

        <div className='main_i'>
          {/* main navigation bar */}
          <div className='mainheader'>
            <div className='mainheader-title' style={{fontSize}}>
              {fileName !== 'Import PDF here' ? fileName : 'SmartReview PDF'}
            </div>
            <FontAwesomeIcon className='icon_trash' icon={faTrashCan} />
          </div>

          {/* page content --- footer*/}
          <div className='main_footer'>
            <div className='main_footer-page'>

              <section className='displaypdf-main'>

                <div className='gray_section'>
                  {isFileChosen ? (
                  <PDFViewerComponent pdf={selectedFile} className='viewer_section'/>
                  ) : (
                      <p className='mainheader_p'>No file chosen</p>
                  )}
                  </div>

              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartReview;
