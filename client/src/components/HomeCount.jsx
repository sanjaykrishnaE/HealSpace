import React from 'react';
import CountUp from 'react-countup';

function HomeCount() {
  return (
    <section className=' flex flex-row mt-40 justify-evenly items-center'>
      <div className='flex flex-col justify-center gap-2 w-[250px] h-[250px] rounded-full items-center shadow-md'>
        <CountUp 
        start={0}
        end={1000}
        delay={0}
        enableScrollSpy={true}
        scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className='text-4xl font-semibold text-[#1E375A]'>
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className='text-lg font-semibold text-light-text-color'>
          Satisfied <br/>
          Patients
        </span>
      </div>
      <div className='flex flex-col justify-center gap-2 w-[250px] h-[250px] rounded-full items-center shadow-md' >
        <CountUp
        start={0}
        end={250}
        delay={0}
        enableScrollSpy={true}
        scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className='text-4xl font-semibold text-[#1E375A]'>
              <span ref={countUpRef} />+
            </div>
          )}

        </CountUp>
        <span className='text-lg font-semibold text-light-text-color'>
          Verified <br />
          Doctors
        </span>
      </div>
      <div className='flex flex-col justify-center gap-2  w-[250px] h-[250px] rounded-full items-center shadow-md'>
        <CountUp
        start={0}
        end={75}
        delay={0}
        enableScrollSpy={true}
        scrollSpyDelay={500}
        >
           {({ countUpRef }) => (
            <div className='text-4xl font-semibold text-[#1E375A]'>
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className='text-lg font-semibold text-light-text-color'>
            Specialist <br />
            Doctors
          </span>
      </div>
    </section>
  )
}

export default HomeCount;
