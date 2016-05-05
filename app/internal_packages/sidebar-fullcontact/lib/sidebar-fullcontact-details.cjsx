_ = require 'underscore'
React = require "react"

{Actions} = require 'nylas-exports'
{RetinaImg} = require 'nylas-component-kit'

class SidebarFullContactDetails extends React.Component
  @displayName: "SidebarFullContactDetails"

  @propTypes:
    contact: React.PropTypes.object
    fullContactData: React.PropTypes.object

  render: =>
    <div className="contact-card-fullcontact">
      <div className="header">
        {@_profilePhoto()}
        <h1 className="name">{@_name()}</h1>
        <div className="email">{@_email()}</div>
      </div>
      <div className="subheader"
           style={display: if @_showSubheader() then "block" else "none"}>
        <div className="title">{@_title()}</div>
        <div className="company">{@_company()}</div>
      </div>
      <div className="social-profiles"
           style={display: if @_showSocialProfiles() then "block" else "none"}>
        {@_socialProfiles()}
      </div>
      {@_noInfo()}
    </div>

  _socialProfiles: =>
    profiles = @_profiles()
    return profiles.map (profile) =>
      <div className="social-profile">
        <RetinaImg
          className="social-icon"
          name="#{profile.typeId}-icon.png"
          mode={RetinaImg.Mode.ContentIsMask} />
        <div className="social-link">
          <a href={profile.url}>{@_username(profile)}</a>
          {@_twitterBio(profile)}
        </div>
      </div>

  _profiles: =>
    profiles = @props.fullContactData.socialProfiles ? []
    profiles = _.filter profiles, (p) => @_supportedProfileTypes[p.typeId]

  _supportedProfileTypes:
    twitter: true
    linkedin: true
    facebook: true

  _showSocialProfiles: =>
    @_profiles().length > 0

  _username: (profile) =>
    if (profile.username ? "").length > 0
      if profile.typeId is "twitter"
        return "@#{profile.username}"
      else
        return profile.username
    else
      return profile.typeName

  _noInfo: =>
    if not @_showSocialProfiles() and not @_showSubheader()
      <div className="sidebar-no-info">No additional information available.</div>
    else return ""

  _twitterBio: (profile) =>
    return "" unless profile.typeId is "twitter"
    return "" unless profile.bio?.length > 0

    # http://stackoverflow.com/a/13398311/793472
    twitterRegex = /(^|[^@\w])@(\w{1,15})\b/g
    replace = '$1<a href="https://twitter.com/$2">@$2</a>'
    bio = profile.bio.replace(twitterRegex, replace)
    <div className="bio sidebar-extra-info"
          dangerouslySetInnerHTML={{__html: bio}}></div>

  _showSubheader: =>
    @_title().length > 0 or @_company().length > 0

  _name: =>
    (@props.fullContactData.contactInfo?.fullName) ? @props.contact?.name ? ""

  _email: =>
    email = @props.contact.email ? ""
    if @_name().toLowerCase().trim() isnt email.toLowerCase().trim()
      return email
    else return ""

  _title: =>
    org = @_primaryOrg()
    return "" unless org?
    if org.current and org.title?
      return org.title
    else if not org.current and org.title?
      return "Former #{org.title}"
    else return ""

  _company: =>
    location = @props.fullContactData.demographics?.locationGeneral ? ""
    name = @_primaryOrg()?.name ? ""
    if name.length > 0 and location.length > 0
      return "#{name} (#{location})"
    else if name.length > 0
      return name
    else if location.length > 0
      return "(#{location})"
    else return ""

  _primaryOrg: =>
    orgs = @props.fullContactData.organizations ? []
    org = _.findWhere orgs, isPrimary: true
    if not org? then org = orgs[0]
    return org

  _profilePhoto: =>
    photos = @props.fullContactData.photos ? []
    photo = _.findWhere photo, isPrimary: true
    if not photo? then photo = _.findWhere photo, typeId: "linkedin"
    if not photo? then photo = photos[0]
    if photo? and photo.url?
      return <img src={photo.url} className="profile-photo" />
    else return ""


module.exports = SidebarFullContactDetails
