using FluentValidation;

namespace IAgro.Application.Features.Fields.Update;

public class UpdateFieldValidator : AbstractValidator<UpdateFieldRequest>
{
    public UpdateFieldValidator()
    {
        RuleFor(c => c.Props.Nickname)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(35);

        RuleFor(c => c.Props.Area)
            .NotEmpty();

        RuleFor(c => c.Props.LocationPoints)
            .Must(lp => lp.Count < 10);
    }
}