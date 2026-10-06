package com.onestep.backend.ai;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }


    // 고민 → 목표 후보
    @PostMapping("/problems")
    public String generateProblems(
            @RequestBody ProblemRequest request
    ) {
        return aiService.generateProblems(
                request.concern(),
                request.priority()
        );
    }


    // 목표 → 작은 과제 후보
    @PostMapping("/actions")
    public String generateActions(
            @RequestBody ActionRequest request
    ) {
        return aiService.generateActions(
                request.concern(),
                request.problem()
        );
    }


    // 작은 과제 → 오늘 할 행동 후보
    @PostMapping("/today-actions")
    public String generateTodayActions(
            @RequestBody TodayActionRequest request
    ) {
        return aiService.generateTodayActions(
                request.concern(),
                request.goal(),
                request.task()
        );
    }
}
        @PostMapping("/shrink-actions")
        public String generateShrinkActions(
                @RequestBody ShrinkActionRequest request
        ) {
        return aiService.generateShrinkActions(
                request.concern(),
                request.goal(),
                request.task(),
                request.action()
        );
        }