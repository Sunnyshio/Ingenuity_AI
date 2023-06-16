import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.css'
import upload from '../components/img/inbox_white.png';
import uploadblack from '../components/img/inbox.png';
import curious from '../components/img/curious.png';
import work from '../components/img/work.png';
import student from '../components/img/graduates.png';
import logo from '../components/img/Logo.png'

function Home() {

    const navigate = useNavigate();
    const [pdf, setPDF] = useState(null);
    const [fileName, setFileName] = useState('Import PDF here');
    const [isFileChosen, setIsFileChosen] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setPDF(URL.createObjectURL(file));
          setFileName(file.name);
          setIsFileChosen(true);
          navigate('/chat');
        }
      };

    return (
        <body className='homepage'>
            <div>
                <h3 className='appName'><img src={logo} style={{ width: 400, height: 200 }}/></h3>
                
                <div className='card_wrapper'>
                    <div className='cards'>
                        <div className='home_form_wrapper'>
                            <form className='home_form_pdfFile_import'
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
                                    <img className='upload_img' src={upload} width={35} height={30} alt='Upload Icon' />

                                    <section className='file_upload_section'>
                                    <span className='chosen_filename_text' title={fileName}>
                                        {fileName.length > 20 ? `${fileName.slice(0, 20)}...` : fileName}
                                    </span>
                                    </section>
                                </div>
                                ) : (
                                <span className='home_upload_text'>
                                    <img className='home_upload_img' src={uploadblack} width={40} height={40} alt='Upload Icon' />
                                    <p className='home_import_pdf_text'>Import PDF here</p>
                                </span>
                                )}
                            </form>
                        </div> 
                    </div>
                </div> {/* end form -- end upload section*/}

                <div className='cardcontainer2_wrapper'>
                <div className='cardcontainer2'>
                    <div className='item1'>
                        <p className='subtitle'>For Students<img className='card_icons' src={student} width={30} height={30}/></p>
                        <div className='line'></div>
                        <p>Enhance your learning experience with ChatPDF. Comprehend textbooks, handouts, and presentations effortlessly. Don't spend hours flipping through research papers and academic articles.</p>
                        <p>Support your academic growth and succeed in your studies effectively and responsibly.</p>
                    </div>

                    <div className='item2'>
                        <p className='subtitle'>For Work<img className='card_icons' src={work} width={30} height={30}/></p>
                        <div className='line'></div>
                        <p>Efficiently analyze your documents. From financial and sales reports to project and business proposals, training manuals, and legal contracts, ChatPDF can quickly provide you with the information you need.</p>
                        <p>Your data is kept confidential in a secure cloud storage and can be deleted at any time.</p>
                    </div>

                    <div className='item3'>
                        <p className='subtitle'>For Curious Minds<img className='card_icons' src={curious} width={30} height={30}/></p>
                        <div className='line'></div>
                        <p>Unlock a wealth of knowledge with ChatPDF. Discover new insights and answers from historical documents, poetry, and literature, effortlessly.</p>
                        <p>ChatPDF can understand any language and reply in your preferred one. Satisfy your curiosity and expand your horizons with the tool that can answer any question from any PDF.</p>
                    </div>
                </div>
                </div>

            </div>
        </body>

    );
}

export default Home
