---
layout: page
author: Niall Robinson
---

<script src="/js/captioned-images.js"></script>

<h1>Say hello here:&emsp;{% include site_social_media.html %}</h1>

<h1>Or just get stuck in</h1>
<p>What kind of background do you have? Click below for information about how to get involved with the Informatics Lab. Don't worry - we like people who have skills in lots of areas, so if you're not sure where you fit, just contact us directly.</p>
<div class="container">
	<div class="row" style="margin: 0">
		<div class="col-md-6">
			<a href="/get-involved/software-engineer/">
		        <div class="thumbnail">
		            <div class="caption">
		                <h4>Software Engineer</h4>
		                <p>Can you help us with writing creative software?</p>
		            </div>
					<img class="img-rounded" src="/images/software-engineer.jpg" alt="Software Engineer"/>
		        </div>
	    	</a>
	    </div>
		<div class="col-md-6">
			<a href="/get-involved/scientist/">
				<div class="thumbnail">
		            <div class="caption">
		                <h4>Scientist</h4>
		                <p>Do you have technical knowledge about the atmosphere?</p>
		            </div>
					<img class="img-rounded" src="/images/scientists.jpg" alt="Scientist"/>	
		        </div>
		    </a>
	    </div>
		<div class="col-md-6">
			<a href="/get-involved/designer/">
				<div class="thumbnail">
		            <div class="caption">
		                <h4>Designer</h4>
		                <p>Can you help us combine technology with art?</p>
		            </div>
					<img class="img-rounded" src="/images/designer.jpg" alt="Designer"/>	
		        </div>
		    </a>
	    </div>
	    <div class="col-md-6">
	    	<a href="/get-involved/end-user/">
		        <div class="thumbnail">
		            <div class="caption">
		                <h4>End User</h4>
		                <p>Can you help us design the user experience?</p>
		            </div>
					<img class="img-rounded" src="/images/public.jpg" alt="End User"/>
		        </div>
		    </a>
		</div>
	</div>
</div>


<h1>Our Partners</h1>
<p>This is the ever growing list of people that we have been involved with through the lab</p>
<div class="container-fluid	">
	<div class="row" style="margin: 0">
		{% for partner in site.partners %}
			<div class="col-md-4">
				<a href="{{ partner.link }}">
			        <div class="thumbnail">
			            <div class="caption">
			               {{ partner.content }}
			            </div>
						<img class="img-rounded" src="{{ partner.image }}"/>
			        </div>
		    	</a>
		    </div>
		{% endfor %}
	</div>
</div>