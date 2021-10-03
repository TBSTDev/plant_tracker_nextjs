import Head from 'next/head';
import React from 'react'; 
import { Button, Form, Message } from 'semantic-ui-react';
import Link from 'next/link';

class AddPlant extends React.Component
{
	//initialize array variable
  	constructor() {
    //super is used to access the variables
		super();
		
		this.state = {
            name: '',
			species: '',
			watering_instructions: '',
			photo: '',
            errorMessage: '',
            error: false,
            isLoading: false,
			success: false,
			successMessage: ''
        } 
		this.onChangePlantName = this.onChangePlantName.bind(this);
		this.onChangePlantSpecies = this.onChangePlantSpecies.bind(this);
		this.onChangePlantWatering = this.onChangePlantWatering.bind(this);
		this.onChangePlantPhoto = this.onChangePlantPhoto.bind(this);
		
        this.onSubmit = this.onSubmit.bind(this);
    }
	onChangePlantName(e) {
		this.setState({name: e.target.value})
	}

	onChangePlantSpecies(e) {
		this.setState({species: e.target.value})
	}

	onChangePlantWatering(e) {
		this.setState({watering_instructions: e.target.value})
	}
	
	onChangePlantPhoto(e) {
		this.setState({photo: e[0]})
	}

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });
		const data = new FormData();
      	data.append('name', this.state.name);
		data.append('species', this.state.species);
		data.append('watering_instructions', this.state.watering_instructions);
      	data.append('photo', this.state.photo);
		
        const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'/plants', {
            method: 'POST',
			body: data
        });
		
        const plants = await response.json();

        if (plants.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: plants.errors,
                success: false,
                successMessage: ''
            });
        } else {
            this.setState({
                name: '',
				species: '',
				watering_instructions: '',
                isLoading: false,
                error: false,
                errorMessage: '',
                success: true,
                successMessage: 'Successfully added '+this.state.name
            });
        }
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
							</div>
						</div>
			
						
						<div className="flex flex-wrap" data-pb-label="Row">
							<div className="w-full lg:w-10/12 mx-auto" data-pb-label="Column">
								<div class="flex justify-center items-center w-full bg-blue-400">
									<div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
										<Link href="/">
										  <a className="bg-green-400 hover:bg-green-600 text-white uppercase text-sm mx-auto p-2 rounded">View all plants</a>
										</Link>
										<h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Add New Plant</h1>
										{ this.state.success &&
											<Message
												success
												header='New plant, added successfully'
												content={this.state.successMessage}
											/>
										}
			
										<Form error={this.state.error} onSubmit={this.onSubmit}>
											<Form.Field error={this.state.error}>
            									<div class="flex flex-col mb-4">
													<label className="mb-2 font-bold text-lg text-gray-900">Plants Name:</label>
													<input className="border py-2 px-3 text-grey-800" placeholder='Enter plants name' value={this.state.name} onChange={this.onChangePlantName} required/>
												</div>
            									<div class="flex flex-col mb-4">
													<label className="mb-2 font-bold text-lg text-gray-900">Plants Species:</label>
													<input className="border py-2 px-3 text-grey-800" placeholder='Enter plants species' value={this.state.species} onChange={this.onChangePlantSpecies} required/>
												</div>
												<div class="flex flex-col mb-4">
													<label className="mb-2 font-bold text-lg text-gray-900">Plant Photo:</label>
													<input className="border py-2 px-3 text-grey-800" onChange={ (e) => this.onChangePlantPhoto(e.target.files) } type="file" required/>
												</div>
            									<div class="flex flex-col mb-4">
													<label className="mb-2 font-bold text-lg text-gray-900">Watering Instruction:</label>
													<textarea
													  onChange={this.onChangePlantWatering}
													  value={this.state.watering_instructions}
													  className="border py-2 px-3 text-grey-800"
													  rows="5"
													  maxLength="255"
													  placeholder="Create a new task"
													  required
													/>
												</div>

											{ this.state.error &&
											<Message
												error
												header='Error creating plants'
												content={this.state.errorMessage}
											/>
											}
											</Form.Field>
											<Button className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto p-4 rounded" type='submit' loading={this.state.isLoading}>Add Plants</Button>
										</Form>
								
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>   
			</div>
		)
	}
}
export default AddPlant;