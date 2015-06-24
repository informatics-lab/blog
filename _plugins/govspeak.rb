##
# Add new renderer to jekyll
###
class Jekyll::Converters::Markdown::Govspeak
  def initialize(config)
    require 'govspeak'
    @config = config
  rescue LoadError
    STDERR.puts 'You are missing a library required for Markdown. Please run:'
    STDERR.puts '  $ [sudo] gem install govspeak'
    raise FatalException.new("Missing dependency: govspeak")
  end

  def convert(content)
    if @config['kramdown']['input']
      input = {:input => 'GFM'}
    else
      input = {}
    end
    Govspeak::Document.new(content, input)
  end
end
