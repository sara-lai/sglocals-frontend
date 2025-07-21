// definitely need this, will be used in many places in app
// https://github.com/akiran/react-slick/
// for ease made compatible for 1 image (skips carousel) or many images (launches carousel)

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Image, IconButton } from '@chakra-ui/react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
// todo find some really nice arrows/side that doesnt uglify

const ImageCarousel = ({ imageUrls, onImageClick }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // arrows: true,
        // nextArrow: <FiArrowRight />,
        // prevArrow:  <FiArrowLeft />
    }
    return (
        <Box>
            {imageUrls?.length === 1 && (
                <Image src={imageUrls[0]} mt={4} width="100%" maxH="440px" objectFit="cover" cursor='pointer' 
                    onClick={onImageClick}
                />                    
            )}
            {imageUrls?.length > 1 && (
                <div className="slider-container">
                    <Slider {...sliderSettings}>
                        {imageUrls.map((imgUrl, idx) => (
                            <Box key={idx}>
                                <Image src={imgUrl} mt={4} width="100%" maxH="440px" objectFit="cover" cursor='pointer' 
                                    onClick={onImageClick}
                                />
                            </Box>
                        ))}                        
                    </Slider>
                </div>
            )}
        </Box>  
    )
}

export default ImageCarousel