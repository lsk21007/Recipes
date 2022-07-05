import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const More: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const getWidth = (): void => {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', getWidth)
        return () => window.removeEventListener('resize', getWidth)
    }, [width])

    return (<div>
        {width > 574 && <Link className='more' to='/all'>More</Link>}
    </div>
    )
}

export default More