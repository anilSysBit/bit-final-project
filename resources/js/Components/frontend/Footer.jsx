import React from 'react'

const Footer = () => {
  return (
    <div className="footer h-[50vh] border mt-5 flex p-5 justify-between bg-red-100">
        <style>{`
                .other_links{
                    ul{
                    margin-top:50px;
                        li{
                            padding:10px;
                            margin-bottom:10px
                            cursor:pointer;
                            &:hover{
                                color:red;
                            }
                        }
                    }
                }
        `}</style>
        <div className="text-description w-1/4 text-justify">
            <p className='font-bold'>About US</p>
            <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat voluptatibus voluptate nobis voluptates reprehenderit quae labore iusto harum earum assumenda repellat nihil nam quam accusantium rerum eius necessitatibus temporibus, fuga explicabo maxime non tempora laborum! Delectus ipsum earum rerum doloremque animi ad amet at hic veniam commodi dicta doloribus magni sint error voluptate eveniet, molestias eligendi officiis tenetur odit accusantium nam nisi vero. Eum, temporibus rerum praesentium consequuntur velit neque voluptas, quam debitis voluptatibus mollitia pariatur nostrum laborum sint aspernatur maxime repudiandae magni natus. Animi quisquam et facere? Porro eum odit beatae ea ad neque accusamus unde vero, dignissimos iure?</p>
        </div>
        <div className="other_links">
            <p className='font-bold border-b border-black p-2'>Links</p>
            <ul>
                <li>Request For Blood</li>
                <li>Donate Blood</li>
                <li>Blog</li>
                <li>Contact Us</li>
                <li>Privary and Poicy</li>
                <li>Terms and Conditions</li>
            </ul>
        </div>

        <div className="foundations flex place-content-center place-items-center gap-20">
            <div className="found text-center">
                <img src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?t=st=1723219086~exp=1723222686~hmac=5c5f6c6bcf809e34d278bfad51d2aecc04100df3c96658115aa040bb250c7add&w=826" alt="hbrf" height={100} width={200}/>
                <p className='font-bold mt-5'>HBRF Foundation</p>
                <p>Most trusted NGOs</p>
            </div>


            <div className="found text-center">
                <img src="https://th.bing.com/th/id/R.c21b6f7c9ac5474afbc35a7c0d64fdb6?rik=IgOrhoJe3BlgMw&pid=ImgRaw&r=0" alt="hbrf" height={100} width={200}/>
                <p className='font-bold mt-5'>Child Care Foundation</p>
                <p>Most trusted NGOs</p>
            </div>

            <button className='bg-blood-red text-white p-2 rounded-md hover:te'>Help Donate Money</button>
        </div>
    </div>
  )
}

export default Footer