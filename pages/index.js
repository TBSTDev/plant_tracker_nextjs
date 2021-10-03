import Head from 'next/head'
import React from 'react'; 
import axios from 'axios';
import Link from 'next/link';

class Home extends React.Component
{
    //initialize array variable
  	constructor() {
    //super is used to access the variables
		super();
		this.state = {
		   data: [],
		   img_path: process.env.NEXT_PUBLIC_IMG_URL,
		}
    }
    componentDidMount() {
		//API request
		axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+"/plants").then(response => {
			//getting and setting api data into variable
			this.setState({ data : response.data });
		})
    }
  	render()
  	{
		return (
			<div>
				<div className="pb-12 section bg-white pt-4" data-pb-label="Section" id="different">
					<div className="container mx-auto px-4" data-pb-label="Container">
						<div className="flex flex-wrap" data-pb-label="Row">
							<div className="w-full lg:w-10/12 mx-auto text-center" data-pb-label="Column">
								<h2 className="text-2xl">Plants Tracker</h2>
								<p className="text-md">Simple Implementation of Next JS</p>
								<hr className="my-5" />
								<h2 className="text-xl"></h2>
							</div>
						</div>
					</div>
				</div>  
				<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 bg-blue-400">
					<div className="text-right pb-12">
						<Link href="/add-plant">
						  <a className="bg-green-400 hover:bg-green-600 text-white uppercase text-sm mx-auto p-2 rounded">Add new plant</a>
						</Link> 
					</div>
					<div className="text-center pb-12"> 
						<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
							Plants List
						</h1>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{this.state.data.map((result) => {
							return (
								<div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
									<div className="mb-8">
										<img className="object-center object-cover rounded-full h-36 w-36" src={this.state.img_path + "/img/" + result.photo} alt="photo" />
									</div>
									<div className="text-center">
										<p className="text-xl text-gray-700 font-bold mb-2">{result.name}</p>
										<p className="text-base text-gray-400 font-normal">{result.species}</p>
									</div>
									<div className="text-center bg-gray">
										{result.watering_instructions}
									</div>
								</div> 
							)}
						)}
					</div>
				</section>
			</div>
		)
	  }
}
export default Home;
