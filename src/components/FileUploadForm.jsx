import { useState } from 'react'
// can't clear multipart form data without useRef
import axios from 'axios'

export default function FileUploadForm () {
    const [formImg, setFormImg] = useState('')
    const [msg, setMsg] = useState('')
    const [displayImg, setDisplayImg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // multipart form-data
            const fd = new FormData()
            // append the data
            fd.append('image', formImg)
            // fd.append('title', someTitle) // if there was other data aside from the image
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+'/api-v1/images', fd)
            console.log(response.data)
            // setDisplayImg(response.data.file)
            setDisplayImg(response.data.cloudImage)
        } catch (err) {
            console.log(err)
            setMsg('server error')
        }
    }
    return (
        <>
            <h4>upload a pic!</h4>
            {displayImg && <img src={displayImg} alt='uploaded img' />}
            {/* && so the broken link does not display (i.e. image does not try to load until the url exists in state) */}

            <form 
                onSubmit={handleSubmit}
                encType='multipart/form' // like selecting 'form-data' in postman
            >
                <label htmlFor="image">Upload an Image</label>
                <input 
                    // no value on this controlled form bc it's an image
                    type="file" 
                    id="image" 
                    onChange={e => setFormImg(e.target.files[0])}
                />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}