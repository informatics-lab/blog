require 'redcarpet'

# Create new renderer extending Redcrpet
class LabRedcarpet < Redcarpet::Render::HTML

  # List of extensions
  # Extensions are basically just regular expressions
  @@extensions = []

  # Add a new extension to the list
  def self.extension(title, regexp = nil, &block)
    regexp ||= %r${::#{title}}(.*?){:/#{title}}$m
    @@extensions << [title, regexp, block]
  end

  # Helper function to generate regex for a string surrounded by two tags
  def self.surrounded_by(tag)
    tag = Regexp::escape(tag)
    %r+(?:\r|\n|^)#{tag}(.*?)#{tag}? *(\r|\n|$)+m
  end

  ##
  # Extensions
  ###

  # Information is surrounded by ^
  extension('informational', surrounded_by("^")) { |body|
    %{\n\n<p class="callout callout-info">#{body}</p>\n}
  }

  # Warnings are surrounded by %
  extension('warning', surrounded_by("%")) { |body|
    %{\n\n<p class="callout callout-warning">#{body}</p>\n}
  }

  # Advisories are surrounded by @
  extension('advisory', surrounded_by("@")) { |body|
    %{\n\n<p class="callout callout-danger">#{body}</p>\n}
  }

  ##
  # This function is a hook to Redcarpet which preprocesses the markdown file
  # through our extensions.
  def preprocess(source)
    @@extensions.each do |title,regexp,block|
      source.gsub!(regexp) {
        instance_exec(*Regexp.last_match.captures, &block)
      }
    end
    source
  end

end

##
# Add new renderer to jekyll
###
class Jekyll::Converters::Markdown
  def extensions
    Hash[ *@config['redcarpet']['extensions'].map {|e| [e.to_sym, true] }.flatten ]
  end

  def markdown
    @markdown ||= Redcarpet::Markdown.new(LabRedcarpet.new(extensions), extensions)
  end

  def convert(content)
    return super unless @config['markdown'] == 'labredcarpet'
    markdown.render(content)
  end
end
