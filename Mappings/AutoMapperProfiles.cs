using AutoMapper;
using SkillLink.Model.Dto;
using SkilLink.Model.Domain;
using SkillLink.Model.Domain;

namespace SkillLink.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<SkillsDto, Skills>();
            CreateMap<Skills, SkillsDto>();

            //mapping different member
            //CreateMap<SkillsDto,Skills>()
            //    .ForMember(x=>x.Name,opt=>opt.MapFrom(x=>x.diffName));

            CreateMap<AddSkillRequestDto,Skills>().ReverseMap();
            CreateMap<UpdateSkillsRequestDto,Skills>().ReverseMap();

            CreateMap<CategoryDto, Category>().ReverseMap();
           // CreateMap<TagDto, Tag>().ReverseMap();
            CreateMap<TagDto, Tag>();
            CreateMap<Tag, TagDto>();

            //event mapping
            CreateMap<AddEventRequestDto, Event>().ReverseMap();

            //event mapping
            CreateMap<AddEventRequestDto, Event>().ReverseMap();

        }


    }
}
