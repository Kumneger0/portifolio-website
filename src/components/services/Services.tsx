import React from 'react'
import sampleImage from '../../../public/frontEnd.webp'
import backend from '../../../public/OIP.jpg'
import image from '../../../public/full-stack-web-development.webp'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'

function Services() {
    return (
      <>
        <h2
          id="Services"
          className="text-center my-20 text-white font-bold font-serif text-2xl">
          Services I offer
        </h2>
        <div className="mb-5 flex h-auto w-full max-w-6xl mx-auto gap-2 justify-center items-stretch flex-wrap">
          <div className="min-w-[300px] max-w-[360px] my-5 text-white">
            <Card className="border-none shadow-md rounded-md py-2 shadow-black items-stretch">
              <CardHeader>
                <CardTitle>Front-end Development</CardTitle>
                <CardDescription className="py-5">
                  I specialize in creating engaging, intuitive user interfaces
                  using HTML, CSS, and JavaScript, along with modern frameworks
                  like React or Svelte. My focus is on responsive design,
                  performance, and accessibility, ensuring a seamless user
                  experience across all devices and platforms
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="min-w-[300px] max-w-[350px]  my-5  text-white">
            <Card className="border-none py-3 shadow-md rounded-md shadow-black">
              <CardHeader>
                <CardTitle>Api Development</CardTitle>
                <CardDescription className="py-4">
                  I am proficient in server-side programming with languages like
                  Node.js, or go, and have experience working with both SQL and
                  NoSQL databases. I can design and implement secure, scalable
                  APIs, and manage server architecture to support robust
                  applications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="min-w-[300px] max-w-[350px]  my-5 text-white">
            <Card className="border-none py-1 shadow-md rounded-md shadow-black">
              <CardHeader>
                <CardTitle>Full Stack Development</CardTitle>
                <CardDescription className="py-[14px]">
                  As a Full Stack Developer, I am equipped to handle all aspects
                  of project development, from designing the user interface, to
                  managing servers and databases, and ensuring smooth, seamless
                  communication between front-end and back-end components. My
                  comprehensive approach ensures efficient project completion
                  and delivers a cohesive end product."
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </>
    );
}

export default Services